import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ location }) => {
  const [weatherData, setWeatherData] = useState({});
  const ACCESS_KEY = "328ef8eefac93b59aa355194a27c254e";
  useEffect(() => {
    console.log("weather-effect called")
    axios(
      `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${location}`
    ).then(res => setWeatherData(res.data.current));
  }, [location]);
  console.log(location, weatherData);
  return (
    <div>
      <h2>Weather in {" " + location}</h2>
      <div>
        temperature:
        {weatherData.temperature
          ? " " + weatherData.temperature + " Celcius"
          : ""}
      </div>
      <img
        src={weatherData.weather_icons ? weatherData.weather_icons[0] : ""}
        alt={"weather icon"}
      />
      <div>
        wind:
        {weatherData.wind_dir
          ? " " +
          weatherData.wind_speed +
          " kph direction " +
          weatherData.wind_dir
          : ""}
      </div>
    </div>
  );
};

export default Weather;
