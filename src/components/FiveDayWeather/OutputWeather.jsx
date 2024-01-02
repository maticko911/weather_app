import React from 'react';

const OutputWeather = ({ weather }) => {
  return (
    <div className='flex items-center justify-between px-4 py-3 border-b border-gray-400'>
      <p className='font-medium text-gray-400'>
        {new Date(weather.dt_txt).toLocaleDateString('en-US', {
          weekday: 'short',
        })}
      </p>
      <img
        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
        className='w-10 h-10'
      />
      <div className='flex flex-col items-center'>
        <p className='text-gray-500 font-medium'>
          {Math.round(weather.main.temp_min)} &deg;
        </p>
        <p className='text-gray-400 font-medium'>
          {Math.round(weather.main.temp_max)} &deg;
        </p>
      </div>
    </div>
  );
};

export default OutputWeather;
