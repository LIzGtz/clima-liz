import axios from 'axios'
import { useState, useEffect } from "react"

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
        country: ""
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
                    country: response.data.sys.country
                });
            });
        })
    }, [currentLocation.latitude, currentLocation.longitude])

    const setTemperaturePreference = function () {
        setIsCelsius(!isCelsius)
    }

    return (
        <div>
            <p>Clima en {weather.city}, {weather.country}</p>
            <p>{isCelsius ? fromKelvinToCelsius(weather.temp) : fromKelvinToFahrenheit(weather.temp)} {isCelsius ? '°C' : '°F'}</p>
            <button onClick={setTemperaturePreference}>{isCelsius ? '°F' : '°C'}</button>
        </div>
    )
}

export default Weather;