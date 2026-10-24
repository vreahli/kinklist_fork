export const initialUi = {
  visibleGroup: 0,
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