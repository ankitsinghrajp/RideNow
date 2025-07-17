import React from 'react'

const UserLogin = () => {
  return (
    <div className='h-screen w-full'>
      <div className='container mx-auto'>
        <div className='md:flex md:justify-center md:items-center'>
           <form className='md:border px-4 py-4 border-gray-400'>
             <h3>What is your email?</h3>
             <input required placeholder='email@example.com' className='bg-[#09090b] outline-none w-full' type="email" />
             <h3>Enter your Password</h3>
             <input className='bg-[#09090b] outline-none' required placeholder='your password' type="password" />
           </form>
           </div>
      </div>
    </div>
  )
}

export default UserLogin