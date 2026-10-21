import { createContext } from 'https://esm.sh/preact';
import { useState, useContext, useReducer } from 'https://esm.sh/preact/hooks';

import { GROUPS } from './config.js';

export const UNANSWERED = 0;
export const NO_PREF = 6;

export const keyOf = (group, kink, sideIndex) =>
  `${group.caption}|${kink}|${sideIndex}`

export const answersReducer = (answers, action) => {
  switch (action.type) {
    case "set": {
      const next = { ...answers };
      if (action.value === UNANSWERED) delete next[action.key];
      else next[key] = value;
      return next;
    }
    case "ClearAll": {
      return {}
    }
    default:
      console.warn('Default action on the answers reducer... something might be going wrong.')
      return answers;
  }
}

// Check and make sure every key is unique.
const seen = new Set();
for (const g of GROUPS) for (const k of g.kinks) {
  const key = keyOf(g, k, 0);
  if (seen.has(key)) console.warn("Duplicate key in config: ", key);
  seen.add(key);
}

