import React from 'react'
import Feed from '../Feed/Feed'

const FiveDayWeather = ({weather}) => {
  return (
    <div>
      {
        weather.length ? (
            <Feed weather={weather} />
        ) : (
            <p className='flex justify-center items-center w-full h-full font-bold font-sans text-3xl px-5'>Please choose destination to show weather!</p>
        )
      }
    </div>
  )
}

export default FiveDayWeather
