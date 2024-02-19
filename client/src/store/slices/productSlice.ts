import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProductsState, Product, productsType } from "../../types/types";


const initialState: IProductsState = {
  products: [],
  cart: [],

};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<productsType>) => {
      if (state.products.length === 0) 
      state.products = action.payload;
   
    },

    addItemToCart: (state, action: PayloadAction<Product>) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === action.payload.id);

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === action.payload.id
            ? {
                ...item,
                quantity: action.payload.quantity || item.quantity + 1,
              }
            : item;
        });
      } else newCart.push({ ...action.payload, quantity: 1 });

      state.cart = newCart;
    },
    buyItem: (state, action: PayloadAction<Product>) => {
      let newCart = [...state.products];
      const found = state.products.find(({ id }) => id === action.payload.id);

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item;
        });
      } else
        newCart.push({ ...action.payload, quantity: action.payload.quantity });

      state.products = newCart;
    },
  },
});

export const { getProducts, addItemToCart, buyItem } = productSlice.actions;
