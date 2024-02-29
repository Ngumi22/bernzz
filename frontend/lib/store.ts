import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import { productsApi } from "./productsApi";
import cartReducer from "./slices/cartSlice";

export const store = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      cart: cartReducer,
      [productsApi.reducerPath]: productsApi.reducer,
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
