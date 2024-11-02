import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

interface Product {
  _id: string,
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  wish: boolean,
  rating: {
    rate: number,
    count: number
  }
};

interface ProductDetailsProps {
  product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [isWish, setIsWish] = useState(false);
  const [reviews,setReviews] = useState([]);

  useEffect(() => {
    if (product.wish) {
      setIsWish(product.wish);
    }

    const fetchComments=async()=>{
      const res = await fetch(`/api/review/comment/${product._id}`);

      if(res.ok){
         const response = await res.json();
      if(response.content){
        setReviews(response.content.productReviews);
        console.log(response)
      }
      }
     
      
    }
    fetchComments();
  }, [product])

  const addToCartFunction = async () => {
    const res = await fetch('/api/cart/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId: product._id,
        orderedQty: 2
      })
    })

    const response = await res.json();
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  const addToWishlistFunction = async () => {
    const res = await fetch('/api/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: product._id
      })
    }
    )

    const response = await res.json();
    if (response.success) {
      toast.success(response.message);
      setIsWish(true);
    } else {
      toast.error(response.message);
    }
  }

  const removeFromWishlistFunction = async () => {
    const res = await fetch(`/api/wishlist/${product._id}`, ({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }))

    const response = await res.json();
    if (response.success) {
      toast.success(response.message);
      setIsWish(false);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className='h-full flex items-center justify-center'>
      {product ? (
        <div className='flex flex-col p-5'>
          <p className='text-2xl font-bold'>{product.title}</p>

          <div className='flex my-3 text-pink-300'>
            <p className='text-4xl font-bold'>${product.price}</p>
          </div>

          <p className='border border-pink-300 rounded-xl p-2 min-h-10'>{product.description}</p>

          <div className='w-full flex flex-col gap-2 mt-2'>
            <div className='flex justify-between'>
              <div className='flex gap-2 items-center p-1 rounded-md border border-pink-300 w-max'>
                <button className='w-10 h-10 text-2xl font-bold hover:text-red-500'>-</button>
                <p className='text-xl font-bold'>10</p>
                <button className='w-10 h-10 text-2xl font-bold hover:text-green-500'>+</button>
              </div>

              <div>
                {isWish ? (
                  <img src='/favourite_active.png' width={40} height={40} alt=''
                  onClick={() => removeFromWishlistFunction()}/>
                ):(
                  <img src='/favourite_inactive.png' width={40} height={40} alt=''
                  onClick={() => addToWishlistFunction()}/>
                )}
              </div>


            </div>


            <div className='flex flex-col justify-center items-center w-full gap-2'>
              <button onClick={() => addToCartFunction()}
                className='text-xl font-bold px-6 py-2 rounded-md bg-pink-300 xl:bg-pink-200 text-white
        hover:bg-pink-300 border border-pink-300 w-full'>Add to Cart</button>

              <button onClick={() => addToCartFunction()}
                className='text-xl font-bold px-6 py-2 rounded-md bg-white text-black
        border border-pink-300 w-full'>Purchase</button>
            </div>

          </div>

          <div className='flex flex-col gap-2 mt-3 max-h-screen bg-white rounded-xl p-2 shadow-xl'>
            <div className='flex justify-between'>
               <p className='text-md font-semibold text-pink-300'>Customer Reviews</p>
               <p className='text-sm font-normal text-gray-500'>View All</p>
            </div>
           
            <div className='flex flex-col gap-2'>
              {reviews.map((item,index)=>(
              <div key={index} className='h-max w-full bg-gray-100 rounded-md p-2 gap-2'>
                <p className='text-sm font-semibold text-blue-400'>{item.userName}</p>
                <p className='text-sm font-normal text-black'>{item.comment}</p>
                <div className='flex gap-3 justify-end'>
                  <div className='flex gap-1'>
                    <img src='/message_icon.png' alt='' width={20} height={20}/>
                    <p className='text-sm font-normal text-gray-500'>0</p>
                  </div>
                  
                  <div className='flex gap-1'>
                    <img src='/like_icon.png' alt='' width={20} height={20}/>
                    <p className='text-sm font-normal text-gray-500'>0</p>
                  </div>
                </div>
              </div>
            ))}
            </div>
            
          </div>

          <div className='rounded-xl h-20 bg-white flex flex-col p-2'>
            <p className='text-sm font-bold text-black'>Specifications</p>
          </div>

        </div>

      ) : (
        <div className='flex justify-center items-center'>
          <p>Loading...</p>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}

export default ProductDetails
