import { html } from './html.js';
import { AppProvider, useAnswer, useAnswers, useUi } from './app.js';
import { GROUPS, SCALES } from './config.js';
import { encode, keyOf, WANT_TO_TRY, NO_PREF, UNANSWERED } from './answers.js';
import { useEffect, useLayoutEffect } from 'preact/hooks';
import { MatrixButton, Button } from './Button.js'
import { setLocalStorage } from './localStorage.js';
import { PAGE_SHARE } from './ui.js';

export const Picker = () => {
  const [answers, dispatchAnswers] = useAnswers();
  const encoded = encode(answers);
  useEffect(() => { setLocalStorage(encoded); }, [encoded]);

  return html`
    <${GroupPreference}/>
    <${GroupPicker}/>
  `
}

const GroupPreference = () => {
  const [ui, dispatchUi] = useUi();

  const group = GROUPS[ui.visibleGroup];

  const scaleConfig = (SCALES[group.scale])['prefText'];

  return html`
    <div class="">
      <h3 class="text-lg uppercase mb-2">${group.caption}</h3>
      ${group.descriptions.slice(0, -1).map(gd => html`<p class="text-muted leading-tight mb-4" dangerouslySetInnerHTML=${{__html: gd}}></p>`)}

      <div class="sticky top-0 py-2 bg-background pb-4">
        <div class="flex gap-4">
          <div>
            <p class="text-muted leading-tight mb-4" dangerouslySetInnerHTML=${{__html: group.descriptions.at(-1)}}></p>
            <p class="text-muted leading-tight mb-4">
              ${getScaleDescriptionLine(scaleConfig)}
            </p>
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
        <${ProgressBar} />
      </div>
      ${group.kinks.map(kink => html`
        <${PreferenceRow} kink=${kink} group=${group}/>
      `)}
    </div>
  `
}

const PreferenceRow = ({kink, group}) => {
  return html`<div class="md:flex md:justify-between mb-2">
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

            if(group.scale == "needs" && iPlus == WANT_TO_TRY) {
              return html``;
            }

            return html`
            <${MatrixButton}
              extraClasses=${answer === iPlus ? "bg-accent text-background hover:text-background" : "text-muted hover:text-fg"}
              onClick=${() => {
                if(answer === iPlus) {
                  setAnswer(UNANSWERED)
                } else {
                  setAnswer(iPlus)
                }
              }}
            >
              ${getNumText(iPlus)}
            </${MatrixButton}>
          `})}
        </div>
        `})}
  </div>`
}

const GroupPicker = ({}) => {
  const [ui, dispatchUi] = useUi();

  useLayoutEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [ui.visibleGroup])

  return html`
    <div class="">
      <div class="flex justify-between mb-4">
        ${(ui.visibleGroup > 0)
          ? html`
            <${Button} onClick=${
              () => {
                dispatchUi({type: "setVisibleGroup", value: (ui.visibleGroup - 1) % GROUPS.length});
              }}
            >${"<"}Prev</${Button}>`
          : html`<span></span>`
        }
        ${(ui.visibleGroup + 1 < GROUPS.length)
            ? html`
              <${Button} onClick=${
              () => {
                dispatchUi({type: "setVisibleGroup", value: (ui.visibleGroup + 1) % GROUPS.length});
              }}
            >Next${">"}</${Button}>`
          : html``
        }
        ${(ui.visibleGroup + 1 == GROUPS.length)
          ? html`
            <${Button} onClick=${
              () => {
                dispatchUi({type: "setVisiblePage", value: PAGE_SHARE });
              }}
            >Share${">"}</${Button}>`
          : html``
        }

      </div>
      <p class="font-mono flex gap-2 flex-wrap text-xs">
        <span class="font-bold">Preference groups:</span> ${GROUPS.map((group, i) => html`
          <button
            class="inline cursor-pointer ${i === ui.visibleGroup ? "bg-accent text-background" : "text-muted"}"
            onClick=${() => {
              dispatchUi({type: "setVisibleGroup", value: i})
            }}
          >[${group.caption}]</button>
        `)}
      </p>
    </div>
  `
}

const ProgressBar = () => {
  const [ui, dispatchUi] = useUi();
  const [answers] = useAnswers();
  const currentGroup = GROUPS[ui.visibleGroup];
  const currentGroupKeys = currentGroup.sides.flatMap((s, si) => currentGroup.kinks.map(k => keyOf(currentGroup, k, si)));
  const answerInGroup = Object.entries(answers).filter(([gk, v]) => currentGroupKeys.includes(gk)).map(([k, v]) => v);
  const answeredCount = answerInGroup.reduce((pv, cv, ci) => cv === 0 ? pv : pv + 1, 0);

  return html`
    <div class="h-1 bg-background border-l-2 border-r-2 border-accent">
      <div class="h-1 bg-accent" style="width: ${(answeredCount / currentGroupKeys.length)*100}%" ></div>
    </div>
  `
}

const getNumText = (iStr) => {
  const i = parseInt(iStr);
  return i == NO_PREF ? "-" : i == WANT_TO_TRY ? "+" : i;
}

const getScaleDescriptionLine = (scale) => {
  return scale.map((text, i) =>
      i === 0 ? html``
    : i === 2 ? html``
    : i === 4 ? html``
    : html`<span class="font-bold font-mono">[${getNumText(i)}]</span> = <span>${text}</span>. `
  );
}