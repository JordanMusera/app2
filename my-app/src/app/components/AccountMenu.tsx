'use client'
import React, { useState } from 'react'

const AccountMenu = ({clikedTab}) => {

    const handleTabClick=(data:string)=>{
        clikedTab(data);
    }
  return (
    <div className='flex flex-col gap-10 md:gap-5'>
         <div onClick={()=>handleTabClick('ordersTab')} className='flex items-center gap-1 w-full p-1 rounded-lg hover:bg-pink-300 justify-start'>
            <img src="/orders_icon.svg" alt="" width={30} height={30}/>
            <label className='font-semibold'>Orders</label>
        </div>

        <div onClick={()=>handleTabClick('favouriteTab')} className='flex items-center gap-1 w-full p-1 rounded-lg hover:bg-pink-300 justify-start'>
            <img src="/favourite_icon.svg" alt="" width={30} height={30}/>
            <label className='font-semibold'>Favourite</label>
        </div>

        <div className='flex items-center gap-1 w-full p-1 rounded-lg hover:bg-pink-300 justify-start'>
            <img src="/settings_icon.svg" alt="" width={30} height={30}/>
            <label className='font-semibold'>Settings</label>
        </div>

        <div className='flex items-center gap-1 w-full p-1 rounded-lg hover:bg-pink-300 justify-start'>
            <img src="/notification_icon.svg" alt="" width={30} height={30}/>
            <label className='font-semibold'>Notifications</label>
        </div>

        <div className='md:flex items-center gap-1 w-full p-1 rounded-lg justify-start hidden'>
            <img src="/profile_icon.svg" alt="" width={30} height={30}/>
            <label className='font-semibold'>Profile</label>
        </div>

        <div className='flex flex-col md:ms-5 gap-10 md:gap-3'>
           <div onClick={()=>handleTabClick("edit_profile")} className='flex justify-start items-center gap-1 w-full p-1 rounded-lg hover:bg-pink-300'>
            <img src="/edit_icon.svg" alt="" width={30} height={30}/>
            <label className='font-semibold'>Edit</label>
        </div> 

        <div onClick={()=>handleTabClick("security")} className='flex justify-start items-center gap-1 w-full p-1 rounded-lg hover:bg-pink-300'>
            <img src="/security_icon.svg" alt="" width={30} height={30}/>
            <label className='font-semibold'>Security</label>
        </div>
        </div>
        
      
    </div>
  )
}

export default AccountMenu
