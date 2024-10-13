'use client'
import { RootState } from '@/store/store';
import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';

const CheckoutCartContainer = () => {
    const { cartItems, loading, totalAmount } = useSelector(
        (state: RootState) => state.cart
    );
    return (
        <div className='p-5 overflow-auto'>
            <p className='text-md text-black font-bold'>Order Summary</p>
            <div className='relative h-20 w-64'>
                {cartItems.map((product, index) => (
                    <div key={index} className='absolute' style={{ left: `${index * 10}px`, zIndex: `${index}` }}>
                        <Image
                            src={product.image}
                            alt='Product Image'
                            width={50}
                            height={50}
                            className='rounded-md shadow-lg'
                        />
                    </div>
                ))}
            </div>

            <div>
                {cartItems.map((product, index) => (
                    <div className='flex text-sm font-semibold items-center gap-2 justify-between'>
                        <p className='text-gray-800 font-light'>{product.title}</p>
                        <p className='text-black'>{product.price}*{product.orderedQty}</p>
                        <p className='text-green-500'>${product.productQtyPrice}</p>
                    </div>
                ))}
            </div>

            <p className='flex justify-between bg-white shadow-lg rounded-md p-2 my-2'>
                <span className='text-md text-black font-bold'>Total</span>
                <span className='text-md text-green-500 font-bold'>${totalAmount}</span>
            </p>

            <button className='bg-pink-300 rounded-2xl p-1 w-full mt-3 text-md font-bold text-white hover:shadow-xl'>Purchase</button>

            <div className='my-3'>
                <p className='text-[12px] text-gray-400 font-normal w-full justify-center flex'>Accepted secure payment methods</p>
                <div className='flex gap-1 justify-center'>
                    <img src="/mpesa_logo.svg" alt="" width={35} height={35} />
                    <img src="/visa_icon.svg" alt="" width={35} height={35} />
                </div>
            </div>
        </div>
    )
}

export default CheckoutCartContainer
