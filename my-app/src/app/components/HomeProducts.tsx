'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

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


const HomeProducts = () => {
    const [products,setProducts] = useState<Product[]>([]);
    const router = useRouter();

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await fetch('/api/products');
            const products:Product[] = await res.json();
            setProducts(products);
        }
        fetchData();
    },[]);

    const productClicked = (product:Product) => {
      router.push(`/viewProduct/${product._id}`);
    };
  return (
    <div className='grid grid-cols-5 gap-5 w-full justify-center px-3'>
    {products.map(product => (
      <div 
        key={product.id} 
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

export default HomeProducts
