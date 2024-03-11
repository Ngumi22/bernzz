import React from 'react'
import { useGetAllProductsQuery } from '@/lib/productsApi'
import LoadingSkeleton from './loadingskeleton';
import { Product } from '@/lib/definitions';

import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";

export default function NewProducts() {
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

      const newProducts: Product[] = allProducts.filter((product: { new: boolean; }) => product.new == true);
  return (
    <section className='container'>
        <div className='flex justify-around items-center'>
            <div className='flex justify-around items-center gap-10'>
            <p className='font-semibold text-xl'>New Products</p>
            <p className='text-sm'>Sales upto 70% off the selected items</p>
            </div>
            <div className='flex items-center gap-4'>
                <p className='font-bold text-lg'>Hurry Up! Offer ends in:</p>
                <div>Count Down</div>
            </div>
        </div>
        <div>
        <ul className='flex justify-between items-center'>
        {newProducts.map(product => (
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
