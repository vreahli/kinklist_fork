import { html } from "./html.js"
import { Button } from "./Button.js"
import { useAnswers, useUi } from "./app.js"
import { PAGE_DISPLAY_LINKED, PAGE_PICKER } from "./ui.js"
import { decodeHash } from "./answers.js";

export const Land = () => {
  const [answers, dispatchAnswers] = useAnswers();
  const [ui, dispatchUi] = useUi();

  return html`
    <div class="max-w-lg">
      <div class="my-4">
        <p class="mb-4 text-2xl">A place to share hypnokink likes/dislikes privately with a friend.</p>
        <p class="mb-4">This preference picker doesn't cover consent preferences. You should talk with your partner about that, not punch it into a list. Works best on desktop. <span class="font-bold">Rotate your phone to landscape if the page won't fit.</b></p>
        <p class="mb-4">Pick your own preferences <span class="underline cursor-pointer font-bold" onClick=${() => { dispatchUi({type: "setVisiblePage", value: PAGE_PICKER })}}>here</span>.</p>

        ${Object.keys(decodeHash()).length === 0
          ? html``
          : html`<p class="mb-4 pl-4 border-l-2 border-l-muted">Looks like someone linked their preferences. Take a look <span class="underline cursor-pointer font-bold" onClick=${() => { dispatchUi({type: "setVisiblePage", value: PAGE_DISPLAY_LINKED})}}>here</span>. <br /> <span class="text-xs">(This can also happen if you went to your own link.)</span></p>`
        }
      </div>

      <div class="mb-4 px-4 border-l-2 border-muted">
        <p class="mb-4 font-bold uppercase">Utilities:</p>
        <${Button}
          onClick=${() => { dispatchAnswers({type: "clearAll"})}}
          >
            Clear Local Preferences
        </${Button}>
        <p class="text-xs">Clears your picker preferences in <span class="font-mono">localStorage</span>, if you want to start over.</p>
      </div>

      <p class="text-xs text-muted"><b class="font-bold">Boring details...</b> Your own preferences are stored locally. At the end of the survey, you'll get a link. The link will have a fragment (#) at the end. Nothing is sent to the server for this, and this page runs without a backend.</p>
    </div>


  `
}