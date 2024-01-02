import React from 'react'
import FiveDayWeather from '../FiveDayWeather/FiveDayWeather'
import {CalendarDaysIcon} from '@heroicons/react/24/solid'
import WeatherCard from '../WeatherCard/WeatherCard'


const Home = ({weather}) => {

  return (
    <div className='flex flex-col justify-start
       items-center pb-20 pt-20 text-white'>
        <WeatherCard weather={weather} /> 
        <div className='mt-10 rounded-md shadow-sm bg-gray-800/80 w-full h-full max-w-md p-6 opacity-60'>
          <div className='grid grid-flow-col border-b'>
          <CalendarDaysIcon className='h-5 w-5 inline-block' />
          <h2 className='uppercase'>5-day forecast <span className='ml-5 font-bold opacity-50'>{weather.city.name}</span></h2>
          </div>
          <div className='my-5'>
              { weather.list ? (
                <FiveDayWeather weather={weather.list} /> ) : (
                  <p className='flex justify-center items-center text-lx font-bold text-red-600 '>Oops something went wrong please reload page!</p>
                ) 
              } 
          </div>
        </div>
      </div>
  )
}

export default Home
