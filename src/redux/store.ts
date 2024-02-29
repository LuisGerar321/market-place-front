import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import productStateSlice from "./features/productStateSlice";
import shoppingCartStateSlice from "./features/shoppingCartStateSlice";
import userStateSlice from "./features/userStateSlice";

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    productState: productStateSlice,
    shoppingState: shoppingCartStateSlice,
    userState: userStateSlice,
  },
});
