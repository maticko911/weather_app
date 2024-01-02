import React from 'react'
import OutputWeather from '../FiveDayWeather/OutputWeather'

const Feed = ({weather}) => {
  return (
    <>
      {
        weather && weather.filter((_, index) => index % 8 === 0).map((preciption) => (
            <OutputWeather key={preciption.dt} weather={preciption} />
        ))
      }
    </>
  )
}

export default Feed
