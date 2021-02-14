import { CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CityHomePage } from '../interfaces';
import { InfoCard } from './InfoCard';


export default function HomePage(){

    const [aucklandInfo, setAucklandInfo] = useState<CityHomePage>({forecastInfo:{ cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, gust_mph:0, humidity:0, pressure_mb:0, temp_c:0, uv:0, vis_km:0, wind_degree:0, wind_dir:"", wind_kph:0}, locationInfo:{country: "", lat:0, localtime:"", lon:0, name:""}});

    const [vladivostokInfo, setVladivostokInfo] = useState<CityHomePage>({forecastInfo:{ cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, gust_mph:0, humidity:0, pressure_mb:0, temp_c:0, uv:0, vis_km:0, wind_degree:0, wind_dir:"", wind_kph:0}, locationInfo:{country: "", lat:0, localtime:"", lon:0, name:""}});

    const [melbourneInfo, setMelbounneInfo] = useState<CityHomePage>({forecastInfo:{ cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, gust_mph:0, humidity:0, pressure_mb:0, temp_c:0, uv:0, vis_km:0, wind_degree:0, wind_dir:"", wind_kph:0}, locationInfo:{country: "", lat:0, localtime:"", lon:0, name:""}});

    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        // Get Auckalnd Info
        fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=Auckland&days=3`,{
        headers:{
            "x-rapidapi-key": `${process.env.REACT_APP_WEATHER_API_KEY}`,
            "x-rapidapi-host": `${process.env.REACT_APP_WEATHER_HOST}`,
        }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setAucklandInfo({
                forecastInfo: response.current,
                locationInfo: response.location
            })
        });

        fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=Vladivostok&days=3`,{
            headers:{
                "x-rapidapi-key": `${process.env.REACT_APP_WEATHER_API_KEY}`,
                "x-rapidapi-host": `${process.env.REACT_APP_WEATHER_HOST}`,
            }
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setVladivostokInfo({
                    forecastInfo: response.current,
                    locationInfo: response.location
                })
            });

        fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=Melbourne&days=3`,{
        headers:{
            "x-rapidapi-key": `${process.env.REACT_APP_WEATHER_API_KEY}`,
            "x-rapidapi-host": `${process.env.REACT_APP_WEATHER_HOST}`,
        }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setMelbounneInfo({
                forecastInfo: response.current,
                locationInfo: response.location
            })
        });
    // eslint-disable-next-line
    setTimeout(()=> {
        if(aucklandInfo.locationInfo.country===""){
            setLoading(false);
        }
    }, 2000);
    },[]);

    console.log(aucklandInfo);
    return(
        <div style={{overflow:"hidden"}}>
            {loading? <div style={{display:'flex', justifyContent:"center", height:"50em"}}><CircularProgress /></div>:<Grid container direction="row" justify="center" alignItems="baseline" spacing={5}>
            {/* Auckland Card */}
            <Grid item md={3} >
                <InfoCard locationInfo={aucklandInfo.locationInfo} currentInfo={aucklandInfo.forecastInfo}/>
            </Grid>
            {/* Vladivostok Card */}
            <Grid item md={3} >
                <InfoCard locationInfo={vladivostokInfo.locationInfo} currentInfo={vladivostokInfo.forecastInfo}/>
            </Grid>
            {/* Melbourne Card */}
            <Grid item md={3} >
                <InfoCard locationInfo={melbourneInfo.locationInfo} currentInfo={melbourneInfo.forecastInfo}/>
            </Grid>
            </Grid>}
        </div>
        
    )
}