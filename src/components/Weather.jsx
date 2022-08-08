import axios from 'axios'
import { useState, useEffect } from "react"
import './Weather.css'

function fromKelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273, 2);
}

function fromKelvinToFahrenheit(kelvin) {
    return Math.round(1.8 * (kelvin - 273) + 32);
}

function Weather() {
    const [isCelsius, setIsCelsius] = useState(true);
    const [weather, setWeather] = useState({
        temp: 273,
        city: "",
        country: "",
        humidity: 0,
        pressure: 0,
        icon: "http://openweathermap.org/img/w/010.png"
    });
    const currentLocation = {
        latitude: 0,
        longitude: 0,
    }
    useEffect(() => {
        const APIURL = "https://api.openweathermap.org/data/2.5/weather";
        const APIKEY = "00071cecea4543a4f30d61b7bb725655";

        navigator.geolocation.getCurrentPosition(location => {
            console.log(location)

            currentLocation.latitude = location.coords.latitude;
            currentLocation.longitude = location.coords.longitude;

            axios.get(APIURL, {
                params: {
                    lat: currentLocation.latitude,
                    lon: currentLocation.longitude,
                    appid: APIKEY
                }
            }).then(response => {
                console.log(response.data);

                setWeather({
                    temp: response.data.main.temp,
                    city: response.data.name,
                    country: response.data.sys.country,
                    humidity: response.data.main.humidity,
                    pressure: response.data.main.pressure,
                    icon: `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`
                });
            });
        })
    }, [currentLocation.latitude, currentLocation.longitude])

    const setTemperaturePreference = function () {
        setIsCelsius(!isCelsius)
    }

    return (
        <div className='weather-card'>
            <div className='title'>
                <span>{weather.city}, {weather.country}</span>
            </div>
            <div className='details'>
                <div className='col-3 weather-main'>
                    <img src={weather.icon}></img>
                    <p>{isCelsius ? fromKelvinToCelsius(weather.temp) : fromKelvinToFahrenheit(weather.temp)} {isCelsius ? '°C' : '°F'}</p>
                </div>
                <div className='col-9 weather-conditions'>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Pressure: {weather.pressure} mmHg</p>
                    <button onClick={setTemperaturePreference}>{isCelsius ? '°F' : '°C'}</button>
                </div>
            </div>
            
        </div>
    )
}

export default Weather;