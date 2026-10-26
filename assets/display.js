import { html } from './html.js';
import { GROUPS, getPrefText } from './config.js'
import { useAnswers } from "./app.js";
import { keyOf } from './answers.js';
import { useUi } from './app.js';

export const Display = () => {
  const [answers, dispatchAnswers] = useAnswers();
  const [ui, dispatchUi] = useUi();

  console.warn('todo - should this get answers from the loaded url? Should I pick local or url?');

  const displayGroups = GROUPS.reduce((acc, g) => {
    const {caption, descriptions, scale} = g;
    g.sides.forEach((side, si) => {
      const kinkVals = g.kinks.reduce((accKink, kink) => {
        const prefVal = getAnswer(keyOf(g, kink, si), answers);
        if(!accKink[prefVal]) { accKink[prefVal] = []};
        accKink[prefVal].push(kink);
        return accKink;
      }, {})

      if(!acc[side]) { acc[side] = [];}
      acc[side].push({caption, descriptions, kinkVals, scale});
    });

    return acc;
  }, {})

  Object.keys(displayGroups);

  return html `
    ${Object.entries(displayGroups).map(([sideCaption, sideGroup]) => html`
      <h1 class="text-2xl leading-none mb-2">${sideCaption}</h1>
      <div class="grid grid-cols-2 gap-4 mb-4">
        ${sideGroup.map(({caption, descriptions, kinkVals, scale}) => html`
          <div class="border-l-2 pl-2">
            <h1 class="text-xl uppercase leading-none mb-2">${caption}</h1>
            ${Object.entries(kinkVals).toReversed().map(([prefVal, kinks]) => {
              const valInt = parseInt(prefVal);
              const highlight =
                  valInt === 6 ? "bg-green-400"
                : valInt === 5 ? "bg-green-400"
                : valInt === 1 ? "bg-red-400"
                : "";
              return html`<p class="text-xs ${highlight}">
                <span class="font-bold">${getPrefText(scale, prefVal)}</span> - <span>${kinks.join(', ')}</span>
              </p>
            `;})}
          </div>
        `)}
      </div>
    `)}
  `;
}

// pass answers in so we don't have to reload it each time
// If found - returns the value. If not found, returns 0 (not filed out)
const getAnswer = (key, answers) => {
  const search = Object.entries(answers).find(([k, v]) => key === k);
  return search ? search[1] : 0;
}