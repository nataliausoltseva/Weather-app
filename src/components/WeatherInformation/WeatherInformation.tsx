import React,{ useEffect, useState } from 'react';
import './WeatherInformation.css';
import { IWEatherInformationProps, CurrentInfo, LocationInfo, ForecastInfo } from '../interfaces';
import { FirstDay } from '../Forecast/FirstDay';
import { OtherDays} from '../Forecast/OtherDays';
import { TodaysInfo } from '../Forecast/TodaysInfo';
import { CircularProgress } from '@material-ui/core';

function WeatherInformation(props: IWEatherInformationProps) {
            
    const [currentInfo, setCurrentInfo] = useState<CurrentInfo>({cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, gust_mph:0, humidity:0, pressure_mb:0, temp_c:0, uv:0, vis_km:0, wind_degree:0, wind_dir:"", wind_kph:0});
    
    const [locationInfo, setLocationInfo] = useState<LocationInfo>({country: "", lat:0, localtime:"", lon:0, name:""});
    
    const [firstForecastInfo, setFirstForecastInfo] = useState<ForecastInfo>({astro:{moon_illumination:"", moon_phase:"",moonrise:"", moonset:"", sunrise:"", sunset:""}, day:{avghumidity:0, maxtemp_c:0, maxwind_kph:0, mintemp_c:0, uv:0}, hour:[{chance_of_rain:0, chance_of_snow:0, cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, temp_c:0, wind_degree:0, wind_kph:0, windchill_c:0, time:""}],date:""});

    const [secondForecastInfo, setSecondForecastInfo] = useState<ForecastInfo>({astro:{moon_illumination:"", moon_phase:"",moonrise:"", moonset:"", sunrise:"", sunset:""}, day:{avghumidity:0, maxtemp_c:0, maxwind_kph:0, mintemp_c:0, uv:0}, hour:[{chance_of_rain:0, chance_of_snow:0, cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, temp_c:0, wind_degree:0, wind_kph:0, windchill_c:0, time:""}],date:""});

    const [thirdForecastInfo, setThirdForecastInfo] = useState<ForecastInfo>({astro:{moon_illumination:"", moon_phase:"",moonrise:"", moonset:"", sunrise:"", sunset:""}, day:{avghumidity:0, maxtemp_c:0, maxwind_kph:0, mintemp_c:0, uv:0},date:"", hour:[{chance_of_rain:0, chance_of_snow:0, cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, temp_c:0, wind_degree:0, wind_kph:0, windchill_c:0, time:""}]});

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${props.SearchQuery}&days=3`,{
        headers:{
            "x-rapidapi-key": `${process.env.REACT_APP_WEATHER_API_KEY}`,
            "x-rapidapi-host": `${process.env.REACT_APP_WEATHER_HOST}`,
        }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setCurrentInfo(response.current);
            setLocationInfo(response.location);
            setFirstForecastInfo(response.forecast.forecastday[0]);
            setSecondForecastInfo(response.forecast.forecastday[1]);
            setThirdForecastInfo(response.forecast.forecastday[2]);
            return;
        });
        setTimeout(()=> {
            if(locationInfo.country===""){
                setLoading(false);
            }
        }, 2000);
    // eslint-disable-next-line
    },[props.SearchQuery]);

    return (
        <div style={{fontSize:"1em"}}>
            {loading? <div style={{display:'flex', justifyContent:"center", height:"50em"}}><CircularProgress /></div>: <div style={{fontSize:"1em"}}><TodaysInfo currentInfo={currentInfo} forecast={firstForecastInfo} locationInfo={locationInfo} />
            <div style={{position:"relative"}}>
                <FirstDay forecastList={firstForecastInfo} locationInfo={locationInfo} />
            </div>
            <div style={{marginLeft:"2em", marginTop:"2em"}}>
                <OtherDays forecastList={secondForecastInfo}/>
            </div>
            <div style={{marginLeft:"2em", marginTop:"2em"}}>
                <OtherDays forecastList={thirdForecastInfo}/>
            </div></div>}
        </div>
    );
}

export default WeatherInformation;