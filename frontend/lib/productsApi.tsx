// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      //get all products
      query: () => `products`,
      keepUnusedDataFor: 5,
    }),

    getProductById: builder.query({
      query: (id) => `products/${id}`, //get id
      keepUnusedDataFor: 5,
    }),

    getAllCategories: builder.query({
      query: () => `/categories`, //get all categories
      keepUnusedDataFor: 5,
    }),

    getCategory: builder.query({
      query: (id) => `/categories/${id}`, //get category by id
      keepUnusedDataFor: 5,
    }),

    getProductByName: builder.query({
      query: (name) => `products/${name}`, //get product by id
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
  useGetAllCategoriesQuery,
} = productsApi;
export type Category = string;
