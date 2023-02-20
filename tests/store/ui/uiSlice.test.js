import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";

describe("Test in uiSlice.js", () => {
  test("should return default state", () => {
    expect(uiSlice.getInitialState()).toStrictEqual({ isDateModalOpen: false });
  });

  test("should change isDateModalOpen correctly", () => {
    let state = uiSlice.getInitialState();

    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
