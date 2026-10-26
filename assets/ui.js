export const PAGE_PICKER = "PAGE_PICKER";
export const PAGE_DISPLAY = "PAGE_DISPLAY";

export const initialUi = {
  visibleGroup: 0,
  visiblePage: PAGE_DISPLAY,
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