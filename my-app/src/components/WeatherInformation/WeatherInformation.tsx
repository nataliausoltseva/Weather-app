import React,{ useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

//need to have a condition info about current day when calling the api
interface CurrentInfo {
    cloud: number,
    condition: Condition,
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

interface Condition {
    text: string,
    icon: string,
    code: number
}

//array
interface ForecastInfo{
    astro: Astro,
    day: Day,
    hour: Hour[]
}

interface Astro{
    moon_illumination: string,
    moon_phase: string,
    moonrise: string,
    moonset: string,
    sunrise: string,
    sunset: string
}

interface Day{
    avghumidity: number,
    maxtemp_c: number,
    maxwind_kph: number,
    mintemp_c: number,
    uv: number
}

//array
interface Hour{
    chance_of_rain:number,
    chance_of_snow: number,
    cloud: number,
    condition: Condition,
    feelslike_c: number,
    temp_c: number,
    wind_degree: number,
    wind_kph: number,
    windchill_c: number,
    time: string
}

interface LocationInfo {
    country: string,
    lat: number,
    localtime: string,
    lon: number,
    name: string
}

interface IWEatherInformationProps {
    SearchQuery: (string|null);
}

function WeatherInformation(props: IWEatherInformationProps) {
    
    const [currentInfo, setCurrentInfo] = useState<CurrentInfo>({cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, gust_mph:0, humidity:0, pressure_mb:0, temp_c:0, uv:0, vis_km:0, wind_degree:0, wind_dir:0, wind_kph:0});
    
    const [locationInfo, setLocationInfo] = useState<LocationInfo>({country: "", lat:0, localtime:"", lon:0, name:""});
    
    const [forecastInfo, setForecastInfo] = useState<ForecastInfo[]>([{astro:{moon_illumination:"", moon_phase:"",moonrise:"", moonset:"", sunrise:"", sunset:""}, day:{avghumidity:0, maxtemp_c:0, maxwind_kph:0, mintemp_c:0, uv:0}, hour:[{chance_of_rain:0, chance_of_snow:0, cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, temp_c:0, wind_degree:0, wind_kph:0, windchill_c:0, time:""}]}]);

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
            setForecastInfo(response.forecast.forecastday);
        });
    
    // eslint-disable-next-line
    },[props.SearchQuery]);
    
    function firstDay(){
        var hours = [];
        for(var i=0; i<forecastInfo[0].hour.length;i++){
            var newDate =  new Date(forecastInfo[0].hour[i].time);
            var today = new Date(locationInfo.localtime);
            var newMin = newDate.getHours()*60 + newDate.getMinutes();
            var todayMin = today.getHours()*60 + today.getMinutes();
            if(newMin > todayMin){
                var time = `${newDate.getHours()}:00`;
                if(forecastInfo[0].hour[i].chance_of_rain !== 0){
                    hours.push({"hour":time, "icon":forecastInfo[0].hour[i].condition.icon, "text":forecastInfo[0].hour[i].condition.text, "temp_c":forecastInfo[0].hour[i].temp_c, "chance_rain":forecastInfo[0].hour[i].chance_of_rain});
                }
                if(forecastInfo[0].hour[i].chance_of_snow !== 0){
                    hours.push({"hour":time, "icon":forecastInfo[0].hour[i].condition.icon, "text":forecastInfo[0].hour[i].condition.text, "temp_c":forecastInfo[0].hour[i].temp_c, "chance_snow":forecastInfo[0].hour[i].chance_of_snow});
                }
                else{
                    hours.push({"hour":time, "icon":forecastInfo[0].hour[i].condition.icon, "text":forecastInfo[0].hour[i].condition.text, "temp_c":forecastInfo[0].hour[i].temp_c});
                }
            }
        }

        var body =(
            <div style={{display:"flex", flexDirection:"row", listStyle:"none"}}>
                {hours.map((item,i) => <li key={i}><img src={item.icon} alt={item.text}/> {item.text}, {item.hour}, {item.temp_c}°C</li>)}
            </div>
        );

        return body;
    }

    function secondDay(){
        var hours = [];
        for(var i=0; i<forecastInfo[1].hour.length;i++){
            var newDate =  new Date(forecastInfo[1].hour[i].time);
            var time = `${newDate.getHours()}:00`;
            if(forecastInfo[1].hour[i].chance_of_rain !== 0){
                hours.push({"hour":time, "icon":forecastInfo[1].hour[i].condition.icon, "text":forecastInfo[1].hour[i].condition.text, "temp_c":forecastInfo[1].hour[i].temp_c, "chance_rain":forecastInfo[1].hour[i].chance_of_rain});
            }
            if(forecastInfo[1].hour[i].chance_of_snow !== 0){
                hours.push({"hour":time, "icon":forecastInfo[1].hour[i].condition.icon, "text":forecastInfo[1].hour[i].condition.text, "temp_c":forecastInfo[1].hour[i].temp_c, "chance_snow":forecastInfo[1].hour[i].chance_of_snow});
            }
            else{
                hours.push({"hour":time, "icon":forecastInfo[1].hour[i].condition.icon, "text":forecastInfo[1].hour[i].condition.text, "temp_c":forecastInfo[1].hour[i].temp_c});
            }
        }

        var body =(
            <div style={{display:"flex", flexDirection:"row", listStyle:"none"}}>
                {hours.map((item,i) => <li key={i}><img src={item.icon} alt={item.text}/> {item.text}, {item.hour}, {item.temp_c}°C</li>)}
            </div>
        );

        return body;
    }

    function thirdDay(){
        var hours = [];
        for(var i=0; i<forecastInfo[2].hour.length;i++){
            var newDate =  new Date(forecastInfo[2].hour[i].time);
            var time = `${newDate.getHours()}:00`;
            if(forecastInfo[2].hour[i].chance_of_rain !== 0){
                hours.push({"hour":time, "icon":forecastInfo[2].hour[i].condition.icon, "text":forecastInfo[2].hour[i].condition.text, "temp_c":forecastInfo[2].hour[i].temp_c, "chance_rain":forecastInfo[2].hour[i].chance_of_rain});
            }
            if(forecastInfo[2].hour[i].chance_of_snow !== 0){
                hours.push({"hour":time, "icon":forecastInfo[2].hour[i].condition.icon, "text":forecastInfo[2].hour[i].condition.text, "temp_c":forecastInfo[2].hour[i].temp_c, "chance_snow":forecastInfo[2].hour[i].chance_of_snow});
            }
            else{
                hours.push({"hour":time, "icon":forecastInfo[2].hour[i].condition.icon, "text":forecastInfo[2].hour[i].condition.text, "temp_c":forecastInfo[2].hour[i].temp_c});
            }
        }

        var body =(
            <div style={{display:"flex", flexDirection:"row", listStyle:"none"}}>
                {hours.map((item,i) => <li key={i}><img src={item.icon} alt={item.text}/> {item.text}, {item.hour}, {item.temp_c}°C</li>)}
            </div>
        );

        return body;
    }
    return (
        <div>
            <div style={{textAlign:"left"}}>
                {locationInfo.name}, {locationInfo.country}
            </div>
            <div style={{textAlign:"left"}}>
                {locationInfo.localtime}
            </div>
            <div>
                <div style={{textAlign:"left"}}>
                    {currentInfo.condition.text}
                    <img src={currentInfo.condition.icon} alt={currentInfo.condition.text} />
                </div>
                <div>Temperature: {currentInfo.temp_c}°C</div>
                <div>Feels like: {currentInfo.feelslike_c}°C</div>
                <div>UV: {currentInfo.uv}
                    <div>
                        Max UV: {forecastInfo[0].day.uv}
                    </div>
                </div>
                <div>Wind Direction: {currentInfo.wind_dir}</div>
                <div>Wind speed: {currentInfo.wind_kph}km/h 
                    <div>
                        Max Wind speed: {forecastInfo[0].day.maxwind_kph} km/h
                    </div>
                </div>
            </div>
            <div>
                <div>
                    MoonRise: {forecastInfo[0].astro.moonrise}
                </div>
                <div>
                    MoonSet: {forecastInfo[0].astro.moonset}
                </div>
                <div>
                    Moon Phase: {forecastInfo[0].astro.moon_phase}
                </div>
            </div>
            <div>
                <div>
                    SunRise: {forecastInfo[0].astro.sunrise}
                </div>
                <div>
                    SunSet: {forecastInfo[0].astro.sunset}
                </div>
            </div>
            <div style={{display:"flex", flexDirection:"row", listStyle:"none"}}>
                {firstDay()}
            </div>
            <div style={{display:"flex", flexDirection:"row", listStyle:"none"}}>
                {secondDay()}
            </div>
            <div style={{display:"flex", flexDirection:"row", listStyle:"none"}}>
                {thirdDay()}
            </div>


        </div>
    );
}

export default WeatherInformation;