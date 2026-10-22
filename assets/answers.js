import { createContext } from 'https://esm.sh/preact';
import { useState, useContext, useReducer } from 'https://esm.sh/preact/hooks';

import { GROUPS } from './config.js';

export const UNANSWERED = 0;
export const NO_PREF = 6;

const VERSION = "1_";

export const keyOf = (group, kink, sideIndex) =>
  `${group.caption}|${kink}|${sideIndex}`

export const answersReducer = (answers, action) => {
  switch (action.type) {
    case "set": {
      const next = { ...answers };
      if (action.value === UNANSWERED) delete next[action.key];
      else next[action.key] = action.value;
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

const allKeys = () =>
  GROUPS.flatMap(g =>
    g.kinks.flatMap(k => g.sides.map((_, si) => keyOf(g, k, si)))
  )

export const encode = answers =>
  VERSION + allKeys().map(k => answers[k] ?? UNANSWERED).join('');

export const decode = str => {
  if(!str) return {};
  if(str.indexOf(VERSION) !== 0) return {};
  const keys = allKeys();
  const digits = str.split(VERSION)[1];
  const answers = {};
  keys.forEach((k, i) => {
    const v = Number(digits[i]);
    answers[k] = (Number.isInteger(v) && v >= 1 && v <= NO_PREF) ? v : UNANSWERED;
  })

  return answers;
}