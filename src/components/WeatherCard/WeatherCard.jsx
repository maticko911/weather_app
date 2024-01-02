import React from 'react'


const WeatherCard = ({weather}) => {

  return (
    <section className=' w-full h-full max-w-md p-6 bg-gray-800/80 rounded-md shadow-md'>
      { 
        weather.list && weather.list.length > 0 &&  (
          <div>
            <div className='flex justify-center mb-4'>
              <img src={`http://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png`} alt={weather.list[0].weather[0].main} className='w-16 h-16' />
            </div>
            <div className='mb-4'>
              <h1 className='font-bold text-xl mb-6 text-center font-serif'>{weather.city.name}</h1>
            </div>
            <div>
              <h2 className='text-xl font-bold mb-6 text-center'>{Math.round(weather.list[0].main.temp)} &deg;C</h2>
              <p className='mb-2 text-center font-bold'>{weather.list[0].weather[0].main}</p>
              <div className='grid grid-flow-col justify-items-center items-center'>
                <h4 className='font-sanis'>H: {Math.round(weather.list[0].main.temp_max)} &deg;C</h4>
                <h4 className='font-sanis'>L: {Math.round(weather.list[0].main.temp_min)} &deg; C</h4>
              </div>
            </div>
          </div>
      )}
    </section>
  )
}

export default WeatherCard
