import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../components/Product";

const initialState = {
  sku: undefined,
  name: undefined,
  maxPrice: undefined,
  minPrice: undefined,
};

export const productStateSlice = createSlice({
  name: "productState",
  initialState,
  reducers: {
    setproductState: (state, action) => {
      return {
        ...state,
        ...action.payload,
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

export const { setproductState } = productStateSlice.actions;

export default productStateSlice.reducer;
