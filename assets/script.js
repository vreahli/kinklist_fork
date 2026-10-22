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
    <div class="bg-black text-white">
      <div class="max-w-3xl mx-auto p-12">
        <div class="bg-gray-800 py-2 px-3 border border-gray-700">
          <${FinishedMatrix} />
          <${Counter} />
          <${GroupHeading} />
          <${GroupPreference}/>
          <${GroupPicker}/>
          <p class="wrap-anywhere">${encoded}</p>
        </div>
      </div>

    </div>

    <footer id="footer">Data stolen with ♥ from Herald</footer>
  `;
}

const FinishedMatrix = () => {
  return html`
    <div class="bg-gray-950 shadow-sm border border-gray-800">
      Matrix...
    </div>
  `
}

const Counter = () => {
  return html`
    <span>69</span>
  `
}

const GroupHeading = () => {
  return html`
    <div class="bg-gray-950">
      <span>I am X interested in...</span>
      <span>Never...Always (no preference)</span>
    </div>
  `
}

const GroupPreference = () => {
  const [ui, dispatchUi] = useUi();

  const group = GROUPS[ui.visibleGroup];

  return html`
    <div class="bg-gray-900">
      ${group.sides.map((side, si) => {
        return html`
          <div class="flex justify-between">
            <h3>${side} - ${group.caption}</h3>
            <div class="w-60 bg-gray-600 flex">
              <div class="w-[12.5rem] flex justify-between">
                <span class="text-xs">Strongly Dislike</span>
                <span class="text-xs">Strongly Like</span>
              </div>
              <span>
                N/P
              </span>
            </div>
          </div>
          ${group.kinks.map(kink => html`
            <${PreferenceRow} kink=${kink} group=${group} side=${si}/>
          `)}
        `
      })}
    </div>
  `
}

const PreferenceRow = ({kink, group, side}) => {
  return html`<div class="flex justify-between">
    <div>${kink}</div>
    <${PreferenceRowPicker} kink=${kink} group=${group} side=${side} />
  </div>`
}

const PreferenceRowPicker = ({kink, group, side}) => {
  const k = keyOf(group, kink, side);
  const [answer, setAnswer] = useAnswer(k);

  return html`<div class="flex bg-gray-950">
    ${[...Array(6).keys()].map(i => {
      return html`
      <label class="flex-1 w-10 h-10 ${answer === i + 1 ? "bg-amber-400" : ""}"
        onClick=${() => {
          setAnswer(i + 1)
        }}
      >
        <span class="hidden TODO-SCREEN-READER"></span>
        <span>${i + 1}</span>
      </label>
    `})}
  </div>`
}

const GroupPicker = ({}) => {
  const [ui, dispatchUi] = useUi();

  return html`
    <div class="bg-gray-950">
      <h1> Group picker </h1>
      <ul>
        ${GROUPS.map((group, i) => html`
          <li
            class="${i === ui.visibleGroup ? "bg-gray-600" : "bg-gray-700"}"
            onClick=${() => {
              dispatchUi({type: "setVisibleGroup", value: i})
            }}
          )}>${i} - ${group.caption}</li>
        `)}
      </ul>
    </div>
  `
}

render(html`<${AppProvider}><${App} /></${AppProvider}>`, document.body);