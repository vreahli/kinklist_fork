import { createContext, h, render } from 'https://esm.sh/preact';
import { useState, useContext, useReducer } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';
import { SCALES, GROUPS } from './config.js';
import { answersReducer, UNANSWERED, NO_PREF, keyOf } from './answers.js';
import { uiReducer, initialUi } from './ui.js';
import { AppProvider, useUi } from './app.js';

const html = htm.bind(h);

const AppContext = createContext(null);



const App = () => {
  const [answers, setAnswers] = useState([]);

  return html`
    <div class="bg-black text-white">
      <div class="max-w-3xl mx-auto p-12">
        <div class="bg-gray-800 py-2 px-3 border border-gray-700">
          <${FinishedMatrix} />
          <${Counter} />
          <${GroupHeading} />
          <${GroupPreference}/>
          <${GroupPicker}/>
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
      <h3>${group.caption}</h3>
      ${group.kinks.map(kink => html`
        <${PreferenceRow} kink=${kink} />
      `)}
    </div>
  `
}

const PreferenceRow = ({kink}) => {
  return html`<div class="flex justify-between">
    <div>${kink}</div>
    <${PreferenceRowPicker} />
  </div>`
}

const PreferenceRowPicker = () => {
  return html`<div class="flex bg-gray-950">
    ${[...Array(6).keys()].map(i => html`
      <label class="flex-1 w-10 h-10">
        <span class="hidden TODO-SCREEN-READER"></span>
        <span>${i}</span>
      </label>
    `)}
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