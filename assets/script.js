import { render } from 'preact';
import { AppProvider, useUi } from './app.js';
import { html } from './html.js';
import { Picker } from './picker.js';
import { Display } from './display.js';
import { PAGE_DISPLAY, PAGE_PICKER } from './ui.js';
import { Button } from './Button.js';

// http://localhost:3000/kinklist#1_433773444345324433323534444453343113111552224112455342434343234112266443555323413654512322432332334346262444323331321334434336366664466343533636343641111114444111122216411111323643522242311111173734433114455431154114435

const App = () => {
  const [ui, dispatchUi] = useUi();
  
  return html`
    <div class="text-fg">
      <div class="max-w-3xl mx-auto p-2">
        <div class="">
          <div class="flex gap-4">
            <${Button} onClick=${() => {
              dispatchUi({type: "setVisiblePage", value: PAGE_DISPLAY})
            }}>Display</${Button}>
            <${Button} onClick=${() => {
              dispatchUi({type: "setVisiblePage", value: PAGE_PICKER})
            }}>Picker</${Button}>
          </div>
          ${  ui.visiblePage === PAGE_DISPLAY ? html`<${Display} />`
            : ui.visiblePage === PAGE_PICKER ? html`<${Picker} />`
            : html`<h1>Error - invalid page. </h1>`
          }
        </div>
      </div>

    </div>

    <footer class="text-muted max-w-3xl mx-auto p-2 text-center">
      By <a class="hover:text-accent" href="https://yourinductionsucks.fyi">yourinductionsucks.fyi</a> . <a class="hover:text-accent" href="https://github.com/vreahli/kinklist_fork">GitHub</a> . Forked from <a class="hover:text-accent" href="https://github.com/NanoAi/KinkList">NanoAi</a> <br /> Data stolen and modified originally from some dude called Herald
    </footer>
  `;
}



render(html`<${AppProvider}><${App} /></${AppProvider}>`, document.body);