import React from 'react'
import LoginContainer from '../components/LoginContainer'

const login = () => {
  return (
    <div className='grid grid-cols-2 w-screen h-screen'>
      <div className='col-span-1 bg-pink-100 h-full flex flex-col justify-center items-center p-6'>
        <label className='font-extrabold text-4xl text-pink-300'>MALOOKU</label>
        <img src="/shopping_girl.png" alt="" sizes='full' className='h-full object-contain' />
      </div>
      <div className='col-span-1 flex justify-center items-center bg-gray-200'>
        <LoginContainer/>
      </div>
      
    </div>
  )
}

export default login
