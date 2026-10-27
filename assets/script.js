import { render } from 'preact';
import { AppProvider, useUi } from './app.js';
import { html } from './html.js';
import { Picker } from './picker.js';
import { Display } from './display.js';
import { PAGE_DISPLAY_ME, PAGE_DISPLAY_LINKED, PAGE_PICKER, PAGE_SHARE, PAGE_LAND } from './ui.js';
import { Button } from './Button.js';
import { useAnswers } from './app.js';
import { Share } from './share.js';
import { Land } from './land.js'
import { decodeHash } from "./answers.js";

const App = () => {
  const [ui, dispatchUi] = useUi();
  
  return html`
    <div class="text-fg">
      <div class="max-w-3xl mx-auto p-2">
        <div class="">
          <div class="flex gap-4">
            <${Button}
              onClick=${() => {
                dispatchUi({type: "setVisiblePage", value: PAGE_LAND})
              }}
              state=${ui.visiblePage === PAGE_LAND ? "active" : "inactive"}
            >Welcome</${Button}>
            <${Button}
              onClick=${() => {
                dispatchUi({type: "setVisiblePage", value: PAGE_PICKER})
              }}
              state=${ui.visiblePage === PAGE_PICKER ? "active" : "inactive"}
            >Picker</${Button}>
            <${Button}
              onClick=${() => {
                dispatchUi({type: "setVisiblePage", value: PAGE_DISPLAY_ME})
              }}
              state=${ui.visiblePage === PAGE_DISPLAY_ME ? "active" : "inactive"}
            >My Prefs</${Button}>
            ${Object.keys(decodeHash()).length !== 0 ? html`<${Button}
              onClick=${() => {
                dispatchUi({type: "setVisiblePage", value: PAGE_DISPLAY_LINKED})
              }}
              state=${ui.visiblePage === PAGE_DISPLAY_LINKED ? "active" : "inactive"}
            >Their Prefs</${Button}>` : html``}
            <${Button}
              onClick=${() => {
                dispatchUi({type: "setVisiblePage", value: PAGE_SHARE})
              }}
              state=${ui.visiblePage === PAGE_SHARE ? "active" : "inactive"}
            >Share</${Button}>
          </div>
          ${  ui.visiblePage === PAGE_DISPLAY_ME     ? html`<${Display} />`
            : ui.visiblePage === PAGE_DISPLAY_LINKED ? html`<${Display} />`
            : ui.visiblePage === PAGE_PICKER         ? html`<${Picker} />`
            : ui.visiblePage === PAGE_SHARE          ? html`<${Share} />`
            : ui.visiblePage === PAGE_LAND           ? html`<${Land} />`
            : html`<h1>Error - invalid page. </h1>`
          }
        </div>
      </div>
    </div>

    <footer class="text-muted max-w-3xl mx-auto px-2 text-center mt-6">
      By <a class="hover:text-accent" href="https://yourinductionsucks.fyi">yourinductionsucks.fyi</a> . <a class="hover:text-accent" href="https://github.com/vreahli/kinklist_fork">GitHub</a> . Forked from <a class="hover:text-accent" href="https://github.com/NanoAi/KinkList">NanoAi</a> <br /> Data stolen and modified originally from some dude called Herald
    </footer>
  `;
}

render(html`<${AppProvider}><${App} /></${AppProvider}>`, document.body);