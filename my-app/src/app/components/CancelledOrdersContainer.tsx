'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface Product{
  rating:{
    rate:number,
    count:number
  },
  _id:string,
  id:number,
  title:string,
  price:number,
  description:string,
  category:string,
  image:string
}

interface CancelledOrders{
  _id:string,
  userId:string,
  productId:string,
  orderId:string,
  status:string,
  product:Product,
  quantity:number,
  productQtyPrice:number,
  cancellationDate:string,
}

const CancelledOrdersContainer = ({clickedTab}) => {
  const[cancelledOrders,setCancelledOrders] = useState<CancelledOrders[]>([])

    const handleClickedTab = (tab:string)=>{
        clickedTab(tab)
    }

    useEffect(()=>{
      const fetchCancelledOrders=async()=>{
        const res = await fetch('/api/orders/cancelledOrder');
        const response = await res.json();
        setCancelledOrders(response);
      }
      fetchCancelledOrders();
    },[]);

  return (
    <div className='gap-2 flex flex-col w-full h-full px-5 md:p-0 relative'>
            <div className='top-0 w-full justify-between flex'>
                <button className='text-md text-black font-semibold bg-white border border-pink-300 rounded-md px-2'
                onClick={()=>handleClickedTab('ordersTab')}>Orders</button>
                <button className='text-md text-black font-semibold border border-pink-300 bg-pink-300 rounded-md px-2'
                onClick={()=>handleClickedTab('cancelled_orders_tab')}>Cancelled Orders</button>
                <button className='text-md text-black font-semibold border border-pink-300 bg-white rounded-md px-2'
                onClick={()=>handleClickedTab('refunds_tab')}>Refunds</button>
            </div>
      <p>Cancelled Orders</p>

      <div className='flex flex-col gap-2 overflow-auto'>
        {cancelledOrders && cancelledOrders.map((item,index)=>(
          <div key={index} className='bg-white h-max w-full rounded-lg shadow-lg p-5 flex items-center justify-between'>
            <Image src={item.product.image} alt='' width={100} height={100}/>
            <div className='flex flex-col gap-2'>
              <p className='px-1 bg-orange-300 rounded-md w-max'>{item.status}</p>
              <p className='text-gray-700 text-sm'>{item.cancellationDate}</p>
            </div>
            <div className='flex flex-col gap-3 justify-center'>
              <p className='text-black text-sm font-medium'>{item.product.price} * {item.quantity}</p>
              <p className='text-green-500 text-xl font-semibold'>${item.productQtyPrice}</p>
            </div>
            <div className='flex flex-col w-max gap-4'>
              <p className='text-gray-700 text-sm font-semibold'>Id: {item.productId}</p>
              <button className='border border-pink-300 rounded-lg w-full text-black p-1'>View Product</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CancelledOrdersContainer
