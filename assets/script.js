import { h, render } from 'https://esm.sh/preact';
import { useState } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';
import { SCALES, GROUPS } from './config.js';

const html = htm.bind(h);

const App = () => {
  return html`
    ${GROUPS.map(g => html`
      <div class="bg-slate-800 p-4 text-slate-200">
        <h1 class="text-xl">${g.caption}</h1>
        <div class="grid grid-cols-${g.sides.length + 1}">
          <div></div>
          ${g.sides.map(s => html`
            <div>${s}</div>
          `)}
          ${g.kinks.map(k => html`
            <div>${k}</div>
            ${g.sides.map(s => html`
              <div>inputs</div>
            `)}
          `)}
        </div>

      </div>
    `)}
    <footer id="footer">Data stolen with ♥ from Herald</footer>
  `;
}

render(html`<${App} />`, document.body);