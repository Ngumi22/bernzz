import React from 'react'
import { useGetAllProductsQuery } from '@/lib/productsApi'
import LoadingSkeleton from './loadingskeleton';
import { Product } from '@/lib/definitions';

import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";

export default function BestSeller() {
    const {data:allProducts,isLoading,error} = useGetAllProductsQuery("")
    const dispatch = useDispatch();
    const handleAddToCart = (product: any) => {
      dispatch(addToCart(product));
    };

    if (isLoading) {
        return <div><LoadingSkeleton/></div>;
      }
    
      if (error) {
        return <p>Error loading products</p>;
      }

      const bestSellers: Product[] = allProducts.filter((product: { bestSeller: boolean; }) => product.bestSeller == true);
  return (
    <section className='container my-5'>
        <div className='flex justify-start items-center'>
            <p className='font-semibold text-xl'>Best Sellers</p>
        </div>
        <div>
        <ul className='flex justify-between items-center'>
        {bestSellers.map(product => (
          <li key={product.id}>
            <img src={product.image} className='h-48'/>
            <p>{product.name}</p>
            <p>{product.discountPercentage}%</p>
            <p>${product.price}</p>
            <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-800 p-2 border text-white rounded-md">
                    Add To Cart
                  </button>
            
          </li>
        ))}
      </ul>
        </div>
    </section>
  )
}
