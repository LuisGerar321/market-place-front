import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../components/Product";

const initialState = {
  shoppingCart: [] as IProduct[],
};

export const shoppingCartStateSlice = createSlice({
  name: "productState",
  initialState,
  reducers: {
    addToShoppingCart: (state, action) => {
      const newItem: IProduct = action.payload;

      return {
        ...state,
        shoppingCart: [...state.shoppingCart, newItem],
      };
    },

    removeToShoppingCart: (state, action) => {
      const item: IProduct = action.payload;

      return {
        ...state,
        shoppingCart: state.shoppingCart.filter((product: IProduct) => product.sku != item.sku),
      };
    },

    clearState: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const { addToShoppingCart, removeToShoppingCart } = shoppingCartStateSlice.actions;

export default shoppingCartStateSlice.reducer;
