import { Box } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import React,{ useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ScrollMenu from 'react-horizontal-scrolling-menu';

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
    hour: Hour[],
    date:string
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
    
    const [firstForecastInfo, setFirstForecastInfo] = useState<ForecastInfo>({astro:{moon_illumination:"", moon_phase:"",moonrise:"", moonset:"", sunrise:"", sunset:""}, day:{avghumidity:0, maxtemp_c:0, maxwind_kph:0, mintemp_c:0, uv:0}, hour:[{chance_of_rain:0, chance_of_snow:0, cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, temp_c:0, wind_degree:0, wind_kph:0, windchill_c:0, time:""}],date:""});

    const [secondForecastInfo, setSecondForecastInfo] = useState<ForecastInfo>({astro:{moon_illumination:"", moon_phase:"",moonrise:"", moonset:"", sunrise:"", sunset:""}, day:{avghumidity:0, maxtemp_c:0, maxwind_kph:0, mintemp_c:0, uv:0}, hour:[{chance_of_rain:0, chance_of_snow:0, cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, temp_c:0, wind_degree:0, wind_kph:0, windchill_c:0, time:""}],date:""});

    const [thirdForecastInfo, setThirdForecastInfo] = useState<ForecastInfo>({astro:{moon_illumination:"", moon_phase:"",moonrise:"", moonset:"", sunrise:"", sunset:""}, day:{avghumidity:0, maxtemp_c:0, maxwind_kph:0, mintemp_c:0, uv:0},date:"", hour:[{chance_of_rain:0, chance_of_snow:0, cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, temp_c:0, wind_degree:0, wind_kph:0, windchill_c:0, time:""}]});

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
    // eslint-disable-next-line
    },[props.SearchQuery]);

    function firstDay(){
        var first_hours = [];
        for(var i=0; i<firstForecastInfo.hour.length;i++){
            var newDate =  new Date(firstForecastInfo.hour[i].time);
            var today = new Date(locationInfo.localtime);
            var newMin = newDate.getHours()*60 + newDate.getMinutes();
            var todayMin = today.getHours()*60 + today.getMinutes();
            if(newMin > todayMin){
                var time = `${newDate.getHours()}:00`;
                first_hours.push({"hour":time, "icon":firstForecastInfo.hour[i].condition.icon, "text":firstForecastInfo.hour[i].condition.text, "temp_c":firstForecastInfo.hour[i].temp_c,"rain_chance":firstForecastInfo.hour[i].chance_of_rain,"snow_chance":firstForecastInfo.hour[i].chance_of_snow});
            }
        }

        var body = (
            <ScrollMenu
                arrowLeft={<div style={{ fontSize: "30px", backgroundColor:"pink" }}>{" < "}</div>}
                arrowRight={<div style={{ fontSize: "30px" }}>{" > "}</div>}
                data={first_hours.map((item,i) => <li key={i} style={{listStyle:"none",display:"flex", flexDirection:"column", margin:"20px"}}><img src={item.icon} alt={item.text}/><strong><div>{item.rain_chance>0?`${item.rain_chance}%`:""}</div></strong><strong><div>{item.snow_chance>0?`${item.snow_chance}%`:""}</div></strong><div>{item.hour} </div> <div>{item.temp_c}°C</div></li>)}
            />
        )
        return body;
    }

    function secondDay(){
        var secondHours = [];
        for(var i=0; i<secondForecastInfo.hour.length;i++){
            var newDate =  new Date(secondForecastInfo.hour[i].time);
            var time = `${newDate.getHours()}:00`;
            secondHours.push({"hour":time, "icon":secondForecastInfo.hour[i].condition.icon, "text":secondForecastInfo.hour[i].condition.text, "temp_c":secondForecastInfo.hour[i].temp_c,"rain_chance":secondForecastInfo.hour[i].chance_of_rain,"snow_chance":secondForecastInfo.hour[i].chance_of_snow});
            
        }
        var body = (
            <ScrollMenu
                arrowLeft={<div style={{ fontSize: "30px", backgroundColor:"pink" }}>{" < "}</div>}
                arrowRight={<div style={{ fontSize: "30px" }}>{" > "}</div>}
                data={secondHours.map((item,i) => <li key={i} style={{listStyle:"none",display:"flex", flexDirection:"column", margin:"20px"}}><img src={item.icon} alt={item.text}/><strong><div>{item.rain_chance>0?`${item.rain_chance}%`:""}</div></strong><strong><div>{item.snow_chance>0?`${item.snow_chance}%`:""}</div></strong><div>{item.hour} </div> <div>{item.temp_c}°C</div></li>)}
            />);

        return body;
    }

    function thirDay(){
        var thirdHours = [];
        for(var i=0; i<thirdForecastInfo.hour.length;i++){
            var newDate =  new Date(thirdForecastInfo.hour[i].time);
            var time = `${newDate.getHours()}:00`;
            thirdHours.push({"hour":time, "icon":thirdForecastInfo.hour[i].condition.icon, "text":thirdForecastInfo.hour[i].condition.text, "temp_c":thirdForecastInfo.hour[i].temp_c,"rain_chance":thirdForecastInfo.hour[i].chance_of_rain,"snow_chance":thirdForecastInfo.hour[i].chance_of_snow});
        }

        var body =(
            <ScrollMenu
                arrowLeft={<div style={{ fontSize: "30px", backgroundColor:"pink" }}>{" < "}</div>}
                arrowRight={<div style={{ fontSize: "30px" }}>{" > "}</div>}
                data={thirdHours.map((item,i) => <li key={i} style={{listStyle:"none",display:"flex", flexDirection:"column", margin:"20px"}}><img src={item.icon} alt={item.text}/><strong><div>{item.rain_chance>0?`${item.rain_chance}%`:""}</div></strong><strong><div>{item.snow_chance>0?`${item.snow_chance}%`:""}</div></strong><div>{item.hour} </div> <div>{item.temp_c}°C</div></li>)}
            />
        )
        return body;
    }

    function changeDate(date:string){
        var newDate = new Date(date);
        var month = [];
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        var day = newDate.getDate();
        if(day <10){
            day = parseInt(`0${day}`);
        }

        return `${day} ${month[newDate.getMonth()]} ${newDate.getFullYear()}`;

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
                        Max UV: {firstForecastInfo.day.uv}
                    </div>
                </div>
                <div>Wind Direction: {currentInfo.wind_dir}</div>
                <div>Wind speed: {currentInfo.wind_kph}km/h 
                    <div>
                        Max Wind speed: {firstForecastInfo.day.maxwind_kph} km/h
                    </div>
                </div>
            </div>
            <div>
                <div>
                    MoonRise: {firstForecastInfo.astro.moonrise}
                </div>
                <div>
                    MoonSet: {firstForecastInfo.astro.moonset}
                </div>
                <div>
                    Moon Phase: {firstForecastInfo.astro.moon_phase}
                </div>
            </div>
            <div>
                <div>
                    SunRise: {firstForecastInfo.astro.sunrise}
                </div>
                <div>
                    SunSet: {firstForecastInfo.astro.sunset}
                </div>
            </div>
            <div>
                {firstDay()}
            </div>
            <div>
                <strong style={{textAlign:"left",display:"flex", flexDirection:"row"}}>
                    <div>
                        {changeDate(secondForecastInfo.date)}
                        <PopupState variant="popover" popupId="demo-popup-popover">
                        {(popupState) => (
                            <div>
                            <Button
                                variant="contained"
                                color="primary"
                                {...bindTrigger(popupState)}
                            >
                                Open Popover
                            </Button>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center"
                                }}
                                transformOrigin={{
                                vertical: "top",
                                horizontal: "center"
                                }}
                            >
                                <Box p={2}>
                                <Typography component={'span'} variant={'body2'}>
                                    <p>Moon rise: {secondForecastInfo.astro.moonrise}</p>
                                    <p>Moon set: {secondForecastInfo.astro.moonset}</p>
                                    <p>Moon phase: {secondForecastInfo.astro.moon_phase}</p>
                                    <br/>
                                    <p>Sun rise: {secondForecastInfo.astro.sunrise}</p>
                                    <p>Sun set: {secondForecastInfo.astro.sunset}</p>
                                    <br/>
                                    <p>UV Level: {secondForecastInfo.day.uv}</p>
                                    <p>Wind speed: {secondForecastInfo.day.maxwind_kph} km/h</p>
                                </Typography>
                                </Box>
                            </Popover>
                            </div>
                        )}
                        </PopupState>    
                    </div>
                </strong>
                {secondDay()}
            </div>
            <div>
                <strong style={{textAlign:"left",display:"flex", flexDirection:"row"}}>
                    <div>
                        {changeDate(thirdForecastInfo.date)}
                        <PopupState variant="popover" popupId="demo-popup-popover">
                        {(popupState) => (
                            <div>
                            <Button
                                variant="contained"
                                color="primary"
                                {...bindTrigger(popupState)}
                            >
                                Open Popover
                            </Button>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center"
                                }}
                                transformOrigin={{
                                vertical: "top",
                                horizontal: "center"
                                }}
                            >
                                <Box p={2}>
                                <Typography component={'span'} variant={'body2'}>
                                    <p>Moon rise: {thirdForecastInfo.astro.moonrise}</p>
                                    <p>Moon set: {thirdForecastInfo.astro.moonset}</p>
                                    <p>Moon phase: {thirdForecastInfo.astro.moon_phase}</p>
                                    <br/>
                                    <p>Sun rise: {thirdForecastInfo.astro.sunrise}</p>
                                    <p>Sun set: {thirdForecastInfo.astro.sunset}</p>
                                    <br/>
                                    <p>UV Level: {thirdForecastInfo.day.uv}</p>
                                    <p>Wind speed: {thirdForecastInfo.day.maxwind_kph} km/h</p>
                                </Typography>
                                </Box>
                            </Popover>
                            </div>
                        )}
                        </PopupState>    
                    </div>
                </strong>
                {thirDay()}
            </div>
        </div>
    );
}

export default WeatherInformation;