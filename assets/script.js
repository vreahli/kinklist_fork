import { createContext, h, render } from 'https://esm.sh/preact';
import { useState, useContext, useReducer } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';
import { SCALES, GROUPS } from './config.js';
import { answersReducer, UNANSWERED, NO_PREF, keyOf, encode, decode } from './answers.js';
import { uiReducer, initialUi } from './ui.js';
import { AppProvider, useAnswer, useAnswers, useUi } from './app.js';

const html = htm.bind(h);

const AppContext = createContext(null);



const App = () => {

  const [answers, dispatchAnswers] = useAnswers();

  const encoded = encode(answers);

  return html`
    <div class="text-fg">
      <div class="max-w-3xl mx-auto p2">
        <div class="py-2 px-3">
          <${GroupPreference}/>
          <${GroupPicker}/>
          <p class="wrap-anywhere text-muted font-mono text-xs">${encoded}</p>
        </div>
      </div>

    </div>

    <footer id="footer">Data stolen with ♥ from Herald</footer>
  `;
}

const GroupPreference = () => {
  const [ui, dispatchUi] = useUi();

  const group = GROUPS[ui.visibleGroup];

  return html`
    <div class="">
      <div class="sticky top-0 bg-background pb-2">
        <h3>${group.caption}</h3>
        <${Matrix} />
        <div class="md:flex md:justify-between">
          <span class="grow"></span>
          <div class="flex gap-4">
            ${group.sides.map((side, si) => {
              return html`<span class="flex flex-1 border border-white/10 md:w-48">${side}</span>`;
            })}
          </div>

        </div>
      <${GroupProgress} />
      </div>
      ${group.kinks.map(kink => html`
        <${PreferenceRow} kink=${kink} group=${group}/>
      `)}
    </div>
  `
}

const PreferenceRow = ({kink, group}) => {
  return html`<div class="md:flex md:justify-between mb-4">
    <div>${kink}</div>
    <${PreferenceRowPicker} kink=${kink} group=${group}/>
  </div>`
}

const PreferenceRowPicker = ({kink, group}) => {
  return html`<div class="flex gap-4">
    
      ${group.sides.map((side, si) => {
        const k = keyOf(group, kink, si);
        const [answer, setAnswer] = useAnswer(k);

        return html`
        <div class="flex flex-1 border border-white/10 w-48">
          ${[...Array(6).keys()].map(i => {
            const iPlus = i + 1;
            return html`
            <label class="grid place-content-center flex-1 w-8 h-8 leading-0 ${answer === i + 1 ? "bg-accent text-background hover:text-background" : "text-muted hover:text-fg"}"
              onClick=${() => {
                setAnswer(i + 1)
              }}
            >
              <span class="hidden TODO-SCREEN-READER"></span>
              <span class="font-mono leading-0">[${iPlus != 6 ? iPlus : "-"}]</span>
            </label>
          `})}
        </div>
        `})}
      ${group.sides.length == 1 ? html`<div class="flex flex-1"></div>` : ""}
  </div>`
}

const GroupPicker = ({}) => {
  const [ui, dispatchUi] = useUi();

  return html`
    <div class="">
      <h1> Group picker </h1>
      <ul class="font-mono flex gap-2 flex-wrap">
        ${GROUPS.map((group, i) => html`
          <li
            class="inline ${i === ui.visibleGroup ? "bg-accent text-background" : "text-muted"}"
            onClick=${() => {
              dispatchUi({type: "setVisibleGroup", value: i})
            }}
          )}>${group.caption}</li>
        `)}
      </ul>
    </div>
  `
}

const Matrix = () => {
  return html`
    <div class="w-24 md:w-48 flex flex-wrap">
      ${GROUPS.map(g => g.sides.map((s, si) => g.kinks.map(k => {
        const key = keyOf(g, k, si);
        const [answer, dispatchAnswer] = useAnswer(key);
        const color = answer === 0 ? "bg-background"
          : answer === 1 ? "bg-gray-400"
          : answer === 2 ? "bg-gray-500"
          : answer === 3 ? "bg-gray-600"
          : answer === 4 ? "bg-gray-700"
          : answer === 5 ? "bg-gray-800"
          : "bg-gray-900";
        return html`<span class="w-1 h-1 md:w-2 md:h-2 ${color} shrink-0"></span>`
      })))}
    </div>
  `
}

const GroupProgress = () => {
  const [ui, dispatchUi] = useUi();
  const [answers] = useAnswers();
  const currentGroup = GROUPS[ui.visibleGroup];
  const currentGroupKeys = currentGroup.sides.flatMap((s, si) => currentGroup.kinks.map(k => keyOf(currentGroup, k, si)));
  const answerInGroup = Object.entries(answers).filter(([gk, v]) => currentGroupKeys.includes(gk)).map(([k, v]) => v);
  const answeredCount = answerInGroup.reduce((pv, cv, ci) => cv === 0 ? pv : pv + 1, 0);

  return html`
    <div class="h-1 bg-black">
      <div class="h-1 bg-accent" style="width: ${(answeredCount / currentGroupKeys.length)*100}%" ></div>
    </div>
  `
}

render(html`<${AppProvider}><${App} /></${AppProvider}>`, document.body);