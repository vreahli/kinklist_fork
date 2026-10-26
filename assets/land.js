import { html } from "./html.js"
import { Button } from "./Button.js"
import { useAnswers, useUi } from "./app.js"
import { PAGE_DISPLAY_LINKED } from "./ui.js"
import { decodeHash } from "./answers.js";

export const Land = () => {
  const [answers, dispatchAnswers] = useAnswers();
  const [ui, dispatchUi] = useUi();

  return html`
    <h1> Landing Page </h1>
    
    <p>This works best on desktop. Rotate your phone to the side if the page won't fit.</p>

    <p>This preference picker doesn't cover consent preferences. You should talk with your partner about that, not punch it into a list. </p>

    ${Object.keys(decodeHash()).length === 0
      ? html``
      : html`<p>Looks like someone linked their preferences. Take a look <span class="underline cursor-pointer font-bold" onClick=${() => { dispatchUi({type: "setVisiblePage", value: PAGE_DISPLAY_LINKED})}}>here</span>.</p>`
    }

    <p>Utilities:</p>

    <${Button}
      onClick=${() => { dispatchAnswers({type: "clearAll"})}}
      >
        Clear Local Preferences
    </${Button}>
  `
}