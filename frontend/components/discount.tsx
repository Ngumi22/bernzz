import React from 'react'
import { useGetAllProductsQuery } from '@/lib/productsApi'
import LoadingSkeleton from './loadingskeleton';
import { Product } from '@/lib/definitions';

import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import FlipClock from './flip-clock';

export default function DiscountedItems() {
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

      const discountedProducts: Product[] = allProducts.filter((product: { discountPercentage: number; }) => product.discountPercentage > 0);
  return (
    <section className='container'>
        <div className='flex justify-around items-center'>
            <div className='flex justify-around items-center gap-10'>
            <p className='font-semibold text-xl'>Deals of the week</p>
            <p className='text-sm'>Sales upto 70% off the selected items</p>
            </div>
            <div className='flex items-center gap-4'>
                <p className='font-bold text-lg'>Hurry Up! Offer ends in:</p>
                <div><FlipClock/></div>
            </div>
        </div>
        <div>
        <ul className='flex justify-between items-center'>
        {discountedProducts.map(product => (
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
