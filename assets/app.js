import { h, createContext } from 'https://esm.sh/preact';
import { useState, useContext, useReducer } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';
import { answersReducer, UNANSWERED, NO_PREF, keyOf } from './answers.js';
import { uiReducer, initialUi } from './ui.js';

const html = htm.bind(h);

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [answers, dispatchAnswers] = useReducer(answersReducer, {});
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

export const useUi = () => {
  const { ui, dispatchUi } = useContext(AppContext);
  return [ui, dispatchUi];
}