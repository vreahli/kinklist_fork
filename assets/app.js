import { h, createContext } from 'https://esm.sh/preact';
import { useState, useContext, useReducer } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';
import { answersReducer, UNANSWERED, NO_PREF, keyOf, decode } from './answers.js';
import { uiReducer, initialUi } from './ui.js';

// http://localhost:3000/kinklist#1_1434324354453443434213423303543334534435442213344404303030235443554444354433443423223444333324443445344334354543244434040530454032442333455303043033304544233453352445344443253332234434433433453223354443443324452330354445254344344344432343454544444343523542535453244244343434312334523432335523

const html = htm.bind(h);

const AppContext = createContext(null);

const initAnswers = decode(window.location.hash ? window.location.hash.slice(1) :  "");

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