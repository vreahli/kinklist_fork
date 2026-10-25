export const PAGE_PICKER = "PAGE_PICKER";
export const PAGE_DISPLAY = "PAGE_DISPLAY";
export const DISPLAY_SIDE_SUBJECT = "DISPLAY_SIDE_SUBJECT";
export const DISPLAY_SIDE_TIST = "DISPLAY_SIDE_TIST";

export const initialUi = {
  visibleGroup: 0,
  visiblePage: PAGE_DISPLAY,
  displaySide: DISPLAY_SIDE_SUBJECT,
}

export const uiReducer = (ui, action) => {
  switch (action.type) {
    case "setVisibleGroup":
      return { ...ui, visibleGroup: action.value };
    default:
      console.warn("Hit default in uiReducer. Something might be up.")
      return ui;
  }
}