import { createContext } from 'preact';
import { useContext, useReducer } from 'preact/hooks';
import { answersReducer, decode, UNANSWERED } from './answers.js';
import { initialUi, uiReducer } from './ui.js';
import { html } from './html.js';
import { decodeLocalStorage } from './localStorage.js';

const AppContext = createContext(null);

const initAnswers = decodeLocalStorage();

export const AppProvider = ({ children }) => {
  const [answers, dispatchAnswers] = useReducer(answersReducer, {...initAnswers});
  const [ui, dispatchUi] = useReducer(uiReducer, initialUi);

  return html`
    <${AppContext.Provider} value=${{ answers, dispatchAnswers, ui, dispatchUi }}>
      ${children}
    </${AppContext.Provider}>
  `;
}

export const useAnswer = key => {
  const { answers, dispatchAnswers } = useContext(AppContext);
  return [
    answers[key] ?? UNANSWERED,
    value => dispatchAnswers({ type: "set", key, value })
  ]
}

export const useAnswers = () => {
  const { answers, dispatchAnswers } = useContext(AppContext);
  return [ answers, dispatchAnswers];
}

export const useUi = () => {
  const { ui, dispatchUi } = useContext(AppContext);
  return [ui, dispatchUi];
}