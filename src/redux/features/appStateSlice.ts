import { createSlice } from "@reduxjs/toolkit";

export enum EAppStates {
  HOME = "home",
}

const initialState = {
  currState: EAppStates.HOME,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setAppState } = appStateSlice.actions;

export default appStateSlice.reducer;
