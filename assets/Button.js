import { html } from "./html.js"

export const MatrixButton = ({children, extraClasses, onClick}) => {
 return html`<button
  class="cursor-pointer font-mono font-bold grid place-content-center flex-1 w-8 h-8 leading-0 ${extraClasses}"
  onClick=${onClick}>
    <span class="hidden TODO-SCREEN-READER"></span>
    [${children}]
  </button>`
}

export const Button = ({children, onClick, state}) => {
  const extraClasses =
    state === 'active' ? "bg-accent" : "";

  return html`<button
  class="cursor-pointer font-mono font-bold grid place-content-center h-8 leading-0 uppercase ${extraClasses}"
  onClick=${onClick}>
    [${children}]
  </button>`
}