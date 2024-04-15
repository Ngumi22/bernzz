import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import { productsApi } from "./productsApi";
import cartReducer from "./slices/cartSlice";
import wishReducer from "./slices/wishSlice";

export const store = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      cart: cartReducer,
      wish: wishReducer,
      [productsApi.reducerPath]: productsApi.reducer, // Define the reducer once for both products and cart
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware),
  });
};

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
