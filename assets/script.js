import htm from 'htm';
import { h, render } from 'preact';
import { useEffect } from 'preact/hooks';
import { encode, keyOf, WANT_TO_TRY, NO_PREF } from './answers.js';
import { AppProvider, useAnswer, useAnswers, useUi } from './app.js';
import { GROUPS } from './config.js';

const html = htm.bind(h);

const App = () => {

  const [answers, dispatchAnswers] = useAnswers();
  const encoded = encode(answers);
  useEffect(() => { history.replaceState(null, '', '#' + encoded)}, [encoded]);

  return html`
    <div class="text-fg">
      <div class="max-w-3xl mx-auto p-2">
        <div class="py-2 px-3">
          <${GroupPreference}/>
          <${GroupPicker}/>
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
      <h3 class="text-lg uppercase mb-2">${group.caption}</h3>
      ${group.descriptions.slice(0, -1).map(gd => html`<p class="text-muted leading-tight mb-4" dangerouslySetInnerHTML=${{__html: gd}}></p>`)}

      <div class="sticky top-0 py-2 bg-background">
        <div class="flex gap-4">
          <div>
            <p class="text-muted leading-tight mb-4" dangerouslySetInnerHTML=${{__html: group.descriptions.at(-1)}}></p>
          </div>
          <div>
            <${Matrix} />
          </div>
        </div>
        
        <div class="md:flex md:justify-between">
          <span class="grow"></span>
          <div class="flex gap-4">
            ${group.sides.map((side, si) => {
              return html`<span class="flex flex-1 md:w-48">${side}</span>`;
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
        <div class="flex flex-1 w-48">
          ${[...Array(NO_PREF).keys()].map(i => {
            const iPlus = i + 1;
            return html`
            <button class="grid place-content-center flex-1 w-8 h-8 leading-0 ${answer === i + 1 ? "bg-accent text-background hover:text-background" : "text-muted hover:text-fg"}"
              onClick=${() => {
                setAnswer(i + 1)
              }}
            >
              <span class="hidden TODO-SCREEN-READER"></span>
              <span class="font-mono leading-0">[${iPlus == NO_PREF ? "-" : iPlus == WANT_TO_TRY ? "+" : iPlus}]</span>
            </button>
          `})}
        </div>
        `})}
  </div>`
}

const GroupPicker = ({}) => {
  const [ui, dispatchUi] = useUi();

  return html`
    <div class="">
      <h1> Group picker </h1>
      <ul class="font-mono flex gap-2 flex-wrap">
        ${GROUPS.map((group, i) => html`
          <button
            class="inline ${i === ui.visibleGroup ? "bg-accent text-background" : "text-muted"}"
            onClick=${() => {
              dispatchUi({type: "setVisibleGroup", value: i})
            }}
          )}>${group.caption}</button>
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
        const color = answer === 0 ? "bg-accent/10"
          : answer === 1 ? "bg-accent/30"
          : answer === 2 ? "bg-accent/40"
          : answer === 3 ? "bg-accent/50"
          : answer === 4 ? "bg-accent/60"
          : answer === 5 ? "bg-accent/70"
          : "bg-accent/80";
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
    <div class="h-1 bg-black border-l-2 border-r-2 border-accent">
      <div class="h-1 bg-accent" style="width: ${(answeredCount / currentGroupKeys.length)*100}%" ></div>
    </div>
  `
}

render(html`<${AppProvider}><${App} /></${AppProvider}>`, document.body);