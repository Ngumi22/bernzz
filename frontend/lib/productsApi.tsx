// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      //get all products
      query: () => `products`,
      keepUnusedDataFor: 5,
    }),

    getCategory: builder.query({
      query: (category) => `products/category/${category}`, //get category
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`, //get id
      keepUnusedDataFor: 5,
    }),
    getProductByName: builder.query({
      query: (name) => `products/${name}`, //get id
      keepUnusedDataFor: 5,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllProductsQuery,
  useGetCategoryQuery,
  useGetProductByIdQuery,
} = productsApi;
export type Category = string;
