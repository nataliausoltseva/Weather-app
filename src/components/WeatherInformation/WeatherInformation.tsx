import { Box, Grid } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import moment from 'moment';
import React,{ useEffect, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './WeatherInformation.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { IWEatherInformationProps, CurrentInfo, LocationInfo, ForecastInfo } from '../interfaces';
import { MoonPhases } from '../MoonPhases/MoonPhases';
import { WindDirections } from '../WindDirections/WindDirections';
import { UVLevels } from '../UVLevels';
       
function WeatherInformation(props: IWEatherInformationProps) {
            
    const [currentInfo, setCurrentInfo] = useState<CurrentInfo>({cloud:0, condition:{text:"", icon:"", code:0}, feelslike_c:0, gust_mph:0, humidity:0, pressure_mb:0, temp_c:0, uv:0, vis_km:0, wind_degree:0, wind_dir:"", wind_kph:0});
    
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
                    alignCenter={true}
                    arrowLeft={<div className="LeftArrow" style={{marginLeft:"1em"}}>{" < "}</div>}
                    arrowRight={<div className="RightArrow">{" > "}</div>}
                    clickWhenDrag={false}
                    data={first_hours.map((item,i) => <li key={i} style={{listStyle:"none",display:"flex", flexDirection:"column", margin:"20px"}}><img src={item.icon} alt={item.text}/><strong><div>{item.rain_chance>0?`${item.rain_chance}%`:""}</div></strong><strong><div>{item.snow_chance>0?`${item.snow_chance}%`:""}</div></strong><div>{item.hour} </div> <div>{item.temp_c}°C</div></li>)}
                    dragging={true}
                    hideArrows={true}
                    hideSingleArrow={true}
                    scrollToSelected={false}
                    transition={0.3}
                    translate={0}
                    wheel={true}
                />
        )
        return body;
    }

    function secondDay(){
        var secondHours = [];
        var conditions:any = [{}];
        var modeMap:any = {};
        var maxCount = 1;
        var index = 0;
        for(var i=0; i<secondForecastInfo.hour.length;i++){
            var newDate =  new Date(secondForecastInfo.hour[i].time);
            var time = `${newDate.getHours()}:00`;
            secondHours.push({"hour":time, "icon":secondForecastInfo.hour[i].condition.icon, "text":secondForecastInfo.hour[i].condition.text, "temp_c":secondForecastInfo.hour[i].temp_c,"rain_chance":secondForecastInfo.hour[i].chance_of_rain,"snow_chance":secondForecastInfo.hour[i].chance_of_snow});
            conditions.push(
                {text: secondForecastInfo.hour[i].condition.text, 
                icon: secondForecastInfo.hour[i].condition.icon,
                rain_chance: secondForecastInfo.hour[i].chance_of_rain,
                snow_chance:secondForecastInfo.hour[i].chance_of_snow});        
        }
        for(var j = 0; j < conditions.length; j++)
        {
            var el = conditions[j].text;
            if(modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;  
            if(modeMap[el] > maxCount)
            {
                maxCount = modeMap[el];
                index=j;
            }
        }    
        var body = (
            <div>
                 <strong><div>{conditions[index].rain_chance>0?`${conditions[index].rain_chance}%`:""}</div></strong><strong><div>{conditions[index].snow_chance>0?`${conditions[index].snow_chance}%`:""}</div></strong>
                <img src={conditions[index].icon} alt={conditions[index].text} />
                <p>{secondForecastInfo.day.maxtemp_c}</p>
                <p>{secondForecastInfo.day.mintemp_c}</p>
            </div>
        );
        return body;
    }

    function thirDay(){
        var thirdHours = [];
        var conditions:any = [{}];
        var modeMap:any = {};
        var maxCount = 1;
        var index = 0;

        for(var i=0; i<thirdForecastInfo.hour.length;i++){
            var newDate =  new Date(thirdForecastInfo.hour[i].time);
            var time = `${newDate.getHours()}:00`;
            thirdHours.push({"hour":time, "icon":thirdForecastInfo.hour[i].condition.icon, "text":thirdForecastInfo.hour[i].condition.text, "temp_c":thirdForecastInfo.hour[i].temp_c,"rain_chance":thirdForecastInfo.hour[i].chance_of_rain,"snow_chance":thirdForecastInfo.hour[i].chance_of_snow});
            conditions.push({text: thirdForecastInfo.hour[i].condition.text, icon: thirdForecastInfo.hour[i].condition.icon, rain_chance: thirdForecastInfo.hour[i].chance_of_rain,
                snow_chance:thirdForecastInfo.hour[i].chance_of_snow}); 
            
        }
        for(var j = 0; j < conditions.length; j++)
        {
            var el = conditions[j].text;
            if(modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;  
            if(modeMap[el] > maxCount)
            {
                maxCount = modeMap[el];
                index=j;
            }
        }    
        var body = (
            <div>
                 <strong><div>{conditions[index].rain_chance>0?`${conditions[index].rain_chance}%`:""}</div></strong><strong><div>{conditions[index].snow_chance>0?`${conditions[index].snow_chance}%`:""}</div></strong>
                <img src={conditions[index].icon} alt={conditions[index].text} />
                <p>{thirdForecastInfo.day.maxtemp_c}</p>
                <p>{thirdForecastInfo.day.mintemp_c}</p>
            </div>
        );
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

    function changeCurrentDate(date:string){
        var dateValue = changeDate(date);
        
        var newDate = new Date(date);

        return `${dateValue} ${moment(newDate).format("HH:mm")}`;

    }
    return (
        <div style={{fontSize:"1em"}}>
            <Grid container direction="row" justify="center" alignItems="baseline" spacing={5}>
                <Grid item md={3} >
                    <strong>{locationInfo.name}, {locationInfo.country}</strong>
                        <br/>
                        {changeCurrentDate(locationInfo.localtime)}
                        <div >
                            {currentInfo.condition.text}
                        <br/>
                        <div style={{ fontSize:25,display:"flex", flexDirection:"row"}}>
                            <img src={currentInfo.condition.icon} alt={currentInfo.condition.text} />
                        <div style={{marginTop:"0.5em"}}>{currentInfo.temp_c}°C</div>
                        </div>
                    </div>
                </Grid>
                <Grid  item md={3} >
                    <div style={{display:"flex", flexDirection:"row"}}>
                        UV: <UVLevels uvLevel={currentInfo.uv} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row"}}>
                            Max UV: <UVLevels uvLevel={firstForecastInfo.day.uv} />
                    </div>
                    <div>Wind: <WindDirections windDirection={currentInfo.wind_dir} windSpeed={currentInfo.wind_kph}/> </div>
                </Grid>
                <Grid  item md={3}>
                    <div>
                        MoonRise: {firstForecastInfo.astro.moonrise}
                    </div>
                    <div>
                        MoonSet: {firstForecastInfo.astro.moonset}
                    </div>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        Moon Phase: <MoonPhases moonPhase={firstForecastInfo.astro.moon_phase}/>
                    </div>
                    <div>
                        SunRise: {firstForecastInfo.astro.sunrise}
                    </div>
                    <div>
                        SunSet: {firstForecastInfo.astro.sunset}
                    </div>
                </Grid>                
            </Grid>
            <div style={{position:"relative"}}>
                {firstDay()}
            </div>
            <div style={{marginLeft:"2em"}}>
                <strong style={{textAlign:"left",display:"flex", flexDirection:"row"}}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        {changeDate(secondForecastInfo.date)}
                        <PopupState variant="popover" popupId="demo-popup-popover">
                        {(popupState) => (
                            <div>
                            <ArrowDropDownIcon {...bindTrigger(popupState)} className="ArrowDown"/>
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
                                    <div>Moon rise: {secondForecastInfo.astro.moonrise}</div>
                                    <div>Moon set: {secondForecastInfo.astro.moonset}</div>
                                    <div style={{display:"flex", flexDirection:"row"}}>Moon phase: <MoonPhases moonPhase={secondForecastInfo.astro.moon_phase}/> </div>
                                    <br/>
                                    <div>Sun rise: {secondForecastInfo.astro.sunrise}</div>
                                    <div>Sun set: {secondForecastInfo.astro.sunset}</div>
                                    <br/>
                                    <div style={{display:"flex", flexDirection:"row"}} >Max UV Level: <UVLevels uvLevel={secondForecastInfo.day.uv} /></div>
                                    <div>Wind speed: <WindDirections windSpeed={secondForecastInfo.day.maxwind_kph}/></div>
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
            <div style={{marginLeft:"2em"}}>
                <strong style={{textAlign:"left",display:"flex", flexDirection:"row"}}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        {changeDate(thirdForecastInfo.date)}
                        <PopupState variant="popover" popupId="demo-popup-popover">
                        {(popupState) => (
                            <div>
                            <ArrowDropDownIcon {...bindTrigger(popupState)} className="ArrowDown"/>
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
                                    <div>Moon rise: {thirdForecastInfo.astro.moonrise}</div>
                                    <div>Moon set: {thirdForecastInfo.astro.moonset}</div>
                                    <div style={{display:"flex", flexDirection:"row"}}>Moon phase: <MoonPhases moonPhase={thirdForecastInfo.astro.moon_phase}/></div>
                                    <br/>
                                    <div>Sun rise: {thirdForecastInfo.astro.sunrise}</div>
                                    <div>Sun set: {thirdForecastInfo.astro.sunset}</div>
                                    <br/>
                                    <div style={{display:"flex", flexDirection:"row"}}>Max UV Level: <UVLevels uvLevel={thirdForecastInfo.day.uv}/></div>
                                    <div>Wind speed: <WindDirections windSpeed={thirdForecastInfo.day.maxwind_kph}/></div>
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