import { html } from "./html.js"
import { useAnswers } from "./app.js";
import { encode } from "./answers.js";

export const Share = () => {
  const [answers, dispatchAnswers] = useAnswers();
  const encoded = encode(answers);
  const url = `${window.location.href}#${encoded}`;

  return html`
    <h1> Share Page </h1>
    
    <p><a href=${url} class="hover:text-accent">Link (right click and copy)</a></p>
    <p>Text: </p>
    <p class="wrap-anywhere">${url}</p>
  `
}