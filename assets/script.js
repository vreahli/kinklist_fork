import { h, render } from 'https://esm.sh/preact';
import { useState } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';
import { SCALES, GROUPS } from './config.js';

const html = htm.bind(h);

const App = () => {
  const [display, setDisplay] = useState({
    visibleGroup: 0,
  })

  return html`
    <div class="bg-black text-white">
      <div class="max-w-3xl mx-auto p-12">
        <div class="bg-gray-800 py-2 px-3 border border-slate-700">
          <${FinishedMatrix} />
          <${Counter} />
          <${GroupHeading} />
          <${GroupPreference} display=${display}/>
          <${GroupPicker} display=${display} setDisplay=${setDisplay}/>
        </div>
      </div>

    </div>

    <footer id="footer">Data stolen with ♥ from Herald</footer>
  `;
}

const FinishedMatrix = () => {
  return html`
    <div class="bg-gray-950 shadow-sm border border-slate-800">
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

const GroupPreference = ({display}) => {
  const group = GROUPS[display.visibleGroup];
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
  return html`<div class="flex bg-slate-950">
    ${[...Array(6).keys()].map(i => html`
      <label class="flex-1 w-10 h-10">
        <span class="hidden TODO-SCREEN-READER"></span>
        <span>${i}</span>
      </label>
    `)}
  </div>`
}

const GroupPicker = ({display, setDisplay}) => {

  return html`
    <div class="bg-gray-950">
      <h1> Group picker </h1>
      <ul>
        ${GROUPS.map((group, i) => html`
          <li
            class="${i === display.visibleGroup ? "bg-slate-600" : "bg-slate-700"}"
            onClick=${() => {
            setDisplay({
              ...display,
              visibleGroup: i
            })
          }}>${i} - ${group.caption}</li>
        `)}
      </ul>
    </div>
  `
}

render(html`<${App} />`, document.body);