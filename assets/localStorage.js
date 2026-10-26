import { decode } from "./answers.js";

const KEY = "key_v1"; // decode also handles versioning? TODO dedupe

export const setLocalStorage = (encoded) => {
  localStorage.setItem(KEY, encoded);
}

export const decodeLocalStorage = () => {
  const local = localStorage.getItem(KEY);
  return decode(local);
}