import React from 'react'
import Home from '../Home/Home'


const Weather = ({weather}) => {

  return (
    <div className='felx justify-center'>
    {weather ? (
         <Home weather={weather} />  
      ) : ( 
       <div className='flex justify-center items-center w-full h-screen text-center py-52'>
          <p className='text-xl font-bold text-red-700 text-center p-5'> Please wait! We are fetching data for your location! </p>
        </div>
      )
    }
    </div>
  )
}

export default Weather