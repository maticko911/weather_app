import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Nav = ({search, setSearch}) => {

  return (
    <nav>
        <div className='relative'>
          <span className='absolute top-1/2 right-4 transform -translate-y-1/2'>
            <MagnifyingGlassIcon className='h-10 w-5 inline-block mr-2' />
          </span>
            <input
                type='text'
                autoComplete='on'
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder='Type location...'
                className='w-full block px-4 py-2 border rounded-md bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
        </div>
    </nav>
  )
}

export default Nav
