import { html } from './html.js';
import { GROUPS, getPrefText } from './config.js'
import { useAnswers } from "./app.js";
import { keyOf, decodeHash, WANT_TO_TRY } from './answers.js';
import { useUi } from './app.js';
import { Button } from './Button.js';
import { PAGE_DISPLAY_LINKED, PAGE_DISPLAY_ME } from './ui.js';

export const Display = (answerSource) => {

  const [ui, dispatchUi] = useUi();
  const answers = getAnswers();

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

  return html `
    <div class="flex border-b-4 border-accent mb-4 sticky top-0 bg-background">
      ${Object.keys(displayGroups).map(dg => html`
        <${Button}
          onClick=${() => {
            dispatchUi({type: "setDisplaySide", value: dg})
          }}
          state=${dg === ui.displaySide ? "active" : "inactive"}
          >
          ${dg}
        </${Button}>
        <span class="w-4"></span>
      `)}
    </div>


    
    <div class="2xl:breakout"><div class="max-w-7xl mx-auto">
      <h2 class="text-2xl uppercase mb-2 font-bold">${ui.displaySide === "Me" ? "About Me"
        : ui.displaySide === "As Hypnotist" ? "As the Hypnotist"
        : ui.displaySide === "As Subject"   ? "As the Subject"
        : "Unknown Side" }</h2>
      <div class="columns-2 2xl:columns-3">
      ${(displayGroups[ui.displaySide]).map(({caption, descriptions, kinkVals, scale}) => html`
        <div class="border-l-2 pl-2 mb-4 break-inside-avoid">
          <h1 class="text-xl uppercase leading-none mb-2">${caption}</h1>
          ${Object.entries(kinkVals).toReversed().map(([prefVal, kinks]) => {
            const valInt = parseInt(prefVal);
            const highlight =
                valInt === WANT_TO_TRY ? "px-1 text-white bg-blue-600"
              : valInt === 5           ? "px-1 text-white bg-accent"
              : valInt === 4           ? "px-1 text-black bg-accent/20"
              : valInt === 1           ? "px-1 text-white bg-red-600"
              : "";
            return html`<p class="text-xs ${highlight}">
              <span class="font-bold">${getPrefText(scale, prefVal)}</span> - <span>${kinks.join(', ')}</span>
            </p>
          `;})}
        </div>
      `)}
      </div>
    </div></div>
  `;
}

const getAnswers = (answerSource) => {
  const [ui] = useUi();
  if(ui.visiblePage == PAGE_DISPLAY_ME) {
    const [answers, dispatchAnswers] = useAnswers();
    return answers;
  } else if (ui.visiblePage == PAGE_DISPLAY_LINKED) {
    return decodeHash();
  } else {
    console.warn('invalid page in display.js.');
  }
}

// pass answers in so we don't have to reload it each time
// If found - returns the value. If not found, returns 0 (not filed out)
const getAnswer = (key, answers) => {
  const search = Object.entries(answers).find(([k, v]) => key === k);
  return search ? search[1] : 0;
}