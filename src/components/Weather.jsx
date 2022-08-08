import axios from 'axios'
import { useState, useEffect } from "react"

function Weather () {
    const [apiResponse, setApiResponse] = useState({});
    // const [coords, setCoords] = useState({ latitude: 0, longitude : 0});
    const currentLocation = {
        latitude: 0,
        longitude: 0,
    }
    useEffect(() => {
        const APIURL = "https://api.openweathermap.org/data/2.5/weather";
        const APIKEY = "00071cecea4543a4f30d61b7bb725655";
        // ?lat=21.8590464&lon=-102.2891426&appid=00071cecea4543a4f30d61b7bb725655
        
        navigator.geolocation.getCurrentPosition(location => {
            console.log(location)
            // setCoords({
            //     latitude: location.coords.latitude, 
            //     longitude: location.coords.longitude,
            // })
            currentLocation.latitude = location.coords.latitude;
            currentLocation.longitude = location.coords.longitude;
            
            axios.get(APIURL, {
                params:{
                    lat: currentLocation.latitude, 
                    lon: currentLocation.longitude,
                    appid: APIKEY
                }
            })
                .then(response => {
                    console.log(response.data);
                    setApiResponse(response.data);
                });
        })
    }, [currentLocation.latitude, currentLocation.longitude])
    
    return (
        <div>
            <p>Clima</p>
            <p>{apiResponse.main?.temp} K</p>
        </div>
    )
}

export default Weather;