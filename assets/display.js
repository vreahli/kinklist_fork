import { html } from './html.js';
import { GROUPS } from './config.js'
import { useAnswers } from "./app.js";
import { keyOf } from './answers.js';

export const Display = () => {
  const [answers, dispatchAnswers] = useAnswers();
  console.warn('todo - should this get answers from the loaded url? Should I pick local or url?');

  return html `
    <div class="grid grid-cols-3 gap-2">
    ${GROUPS.map(g => g.sides.map((s, si) => {
      const grouped = g.kinks.reduce((acc, kink) => {
        console.log({acc, kink})
        const prefVal = getAnswer(keyOf(g, kink, si), answers);
        (acc[prefVal] = acc[prefVal] || []).push(kink);
        return acc;
      }, {})


      return html`
        <div class="p-2 border">
          <h1 class="text-xl">${g.caption} - ${s}</h1>
          ${Object.entries(grouped).map(([pref, kinks]) => html`
            <div class="text-xs">Pref ${pref}: ${kinks.map(k => html`<span>${k}</span> `)}</div>
          `)}
        </div>
      `
    }))}
    </div>
  `
}

// pass answers in so we don't have to reload it each time
// If found - returns the value. If not found, returns 0 (not filed out)
const getAnswer = (key, answers) => {
  const search = Object.entries(answers).find(([k, v]) => key === k);
  return search ? search[1] : 0;
}