import React, { useEffect, useState } from 'react';

//need to have a condition info about current day when calling the api
interface CurrentInfo {
    cloud: number,
    feelslike_c:number,
    gust_mph: number,
    humidity: number,
    pressure_mb: number,
    temp_c: number,
    uv: number,
    vis_km: number,
    wind_degree: number,
    wind_dir: number,
    wind_kph: number
}

interface ForecastInfo{
}

interface IWEatherInformationProps {
    SearchQuery: (string|null);
}

function WeatherInformation(props: IWEatherInformationProps) {
    const [currentInfo, setCurrentInfo] = useState([{}]);
    useEffect(()=>{
        fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${props.SearchQuery}&days=3`,{
            headers:{
                "x-rapidapi-key": `${process.env.WEATHER_API}`,
		        "x-rapidapi-host": `${process.env.WEATHER_HOST}`
            }
        })
        .then(response => response.json())
        .then(response => {
            setCurrentInfo(response);
        });
    
    // eslint-disable-next-line
    },[props.SearchQuery]);

    console.log(currentInfo);
    return (
        <div >
        
        </div>
    );
}

export default WeatherInformation;