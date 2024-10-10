'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Wishlist from '../models/wishlist'

interface Product {
        _id:string,
        id:number,
        title:string,
        price:number,
        description:string,
        category:string,
        image:string,
        rating:{
            rate:number,
            count:number
        }
    
}


const favouriteContainer = () => {
    const [products,setProducts] = useState<Product[]>([]);

    const router = useRouter();

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await fetch('/api/wishlist');
            const response = await res.json();
            setProducts(response.wishlist);
        }
        fetchData();
    },[]);

    const productClicked = (product:Product) => {
      router.push(`/viewProduct/${product._id}`);
    };

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 w-full justify-center px-3'>
    {products.map(product => (
      <div 
        key={product._id} 
        className='flex flex-col justify-between items-center rounded-xl bg-slate-100 border border-pink-300 p-1 cursor-pointer'
        onClick={() => productClicked(product)}
      >
        <div className='h-48 w-full flex justify-center items-center'> {/* Set a fixed height */}
          <img 
            className='rounded w-full h-full object-contain' // Use object-contain to fit the image
            src={product.image}
            alt={product.title} // Add meaningful alt text
            sizes='(max-width: 640px) 100px, (max-width: 768px) 150px, (max-width: 1024px) 200px, 300px'
          />
        </div>
        
        <p className='text-md font-semibold text-center'>{product.title}</p>
        <p className='text-center text-md font-medium text-gray-700'>${product.price}</p> {/* Added formatting */}
      </div>
    ))}
  </div>
  )
}

export default favouriteContainer