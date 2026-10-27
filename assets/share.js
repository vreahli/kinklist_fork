import { html } from "./html.js"
import { useAnswers } from "./app.js";
import { encode } from "./answers.js";
import { useUi } from "./app.js";
import { PAGE_DISPLAY_ME } from "./ui.js";

export const Share = () => {
  const [ui, dispatchUi] = useUi();
  const [answers, dispatchAnswers] = useAnswers();
  const encoded = encode(answers);
  const url = `${window.location.href}#${encoded}`;

  return html`
    <div class="max-w-lg">
      <div class="my-4">
        <p class="mb-4 text-2xl">You can link your preferences here.</p>
        <p class="mb-4">Alternatively on desktop, you can use the <span class="underline cursor-pointer font-bold" onClick=${() => { dispatchUi({type: "setVisiblePage", value: PAGE_DISPLAY_ME })}}>My Prefs</span> page and take a few screenshots.</p>
        <p class="mb-4 muted text-xs">(That was a lot to fill out... Good job!)</p>
      </div>
      <div class="mb-4 px-4 border-l-2 border-muted">
        <p class="mb-2 font-bold uppercase">Sharing: </p>
        <p class="mb-2">To share a link... </p>
        <p class="mb-4"><a href=${url} class="hover:text-accent underline">Copy this link (right click and copy)</a></p>
        <p class="mb-2">Or - copy it as plain text below... </p>
        <p class="mb-4 wrap-anywhere text-xs">${url}</p>
      </div>

    </div>
    
  `
}