export const PAGE_PICKER = "PAGE_PICKER";
export const PAGE_DISPLAY_ME = "PAGE_DISPLAY_ME";
export const PAGE_DISPLAY_LINKED = "PAGE_DISPLAY_LINKED";

export const initialUi = {
  visibleGroup: 0,
  visiblePage: PAGE_PICKER,
  displaySide: "Me",
}

export const uiReducer = (ui, action) => {
  switch (action.type) {
    case "setVisibleGroup":
      return { ...ui, visibleGroup: action.value };
    case "setVisiblePage":
      return { ...ui, visiblePage: action.value };
    case "setDisplaySide":
      return { ...ui, displaySide: action.value };
    default:
      console.warn("Hit default in uiReducer. Something might be up.")
      return ui;
  }
}