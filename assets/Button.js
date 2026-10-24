import { html } from "./html.js"

export const MatrixButton = ({children, extraClasses, onClick}) => {
 return html`<button
  class="cursor-pointer grid place-content-center flex-1 w-8 h-8 leading-0 ${extraClasses}"
  onClick=${onClick}>
    ${children}
  </button>`
}

export const Button = ({children, onClick}) => {
 return html`<button
  class="cursor-pointer grid place-content-center h-8 leading-0 uppercase"
  onClick=${onClick}>
    ${children}
  </button>`
}