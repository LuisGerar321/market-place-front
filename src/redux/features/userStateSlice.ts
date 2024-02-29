import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  roleId: "",
};

const userStateSlice = createSlice({
  initialState,
  name: "userStateSlice",
  reducers: {
    updateUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetUser: (state, action) => {
      return {
        name: "",
        email: "",
        roleId: "",
      };
    },
  },
});

export const { updateUser, resetUser } = userStateSlice.actions;
export default userStateSlice.reducer;
