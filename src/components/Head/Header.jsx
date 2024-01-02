import React, { useEffect, useState } from 'react'
import Nav from './Nav/Nav'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'


const Header = ({title, search, setSearch}) => {
  const navigate = useNavigate()
  
  const handleLgout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login')
  }


  return (
    <header className='flex bg-black text-start justify-between p-5 '>
      <h1 className='text-3xl font-bold font-sans text-white'>{title}</h1>
      <div className='hidden md:block md:w-1/2 xl:w-1/3'>
        <Nav search={search} setSearch={setSearch} />
      </div>
      <div className='relative rounded-md bg-gray-600 px-4 py-2 '>
        <button className='text-white font-bold text-xl hover:scale-110 transition duration-150 ease-in-out' onClick={handleLgout}>
          <UserCircleIcon className='h-6 w-5 inline-block' />  
          Log Out
        </button>
      </div>
    </header>
  )
}

export default Header
