import { Box, makeStyles, Modal } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import moment from 'moment';
import React,{ useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


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
    wind_dir: string,
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
  
function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
      
function WeatherInformation(props: IWEatherInformationProps) {
        
    function importAll(r:any) {
        return r.keys().map(r);
    }
    const windImages = importAll(require.context('../WindDirections', false, /.*\.png$/));
    const moonImages = importAll(require.context('../MoonPhases', false, /.*\.PNG$/));
    
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
                arrowLeft={<div style={{ fontSize: "30px", backgroundColor:"#D0D0D0", marginLeft:"1em" }}>{" < "}</div>}
                arrowRight={<div style={{ fontSize: "30px", backgroundColor:"#D0D0D0", marginRight:"1em" }}>{" > "}</div>}
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
                arrowLeft={<div style={{ fontSize: "30px", backgroundColor:"#D0D0D0"}}>{" < "}</div>}
                arrowRight={<div style={{ fontSize: "30px", backgroundColor:"#D0D0D0",marginRight:"1em"}}>{" > "}</div>}
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
                arrowLeft={<div style={{ fontSize: "30px", backgroundColor:"#D0D0D0"}}>{" < "}</div>}
                arrowRight={<div style={{ fontSize: "30px", backgroundColor:"#D0D0D0" ,marginRight:"1em"}}>{" > "}</div>}
                data={thirdHours.map((item,i) => <li key={i} style={{listStyle:"none",display:"flex", flexDirection:"column", margin:"20px"}}><img src={item.icon} alt={item.text}/><strong><div>{item.rain_chance>0?`${item.rain_chance}%`:""}</div></strong><strong><div>{item.snow_chance>0?`${item.snow_chance}%`:""}</div></strong><div>{item.hour} </div> <div>{item.temp_c}°C</div></li>)}
            />
        )
        return body;
    }
    const classes = useStyles();

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
    setOpen(false);
    };

    const [modalStyle] = React.useState(getModalStyle);
    function checkUV(uvLevel:number){
        var body;
        if(uvLevel === 1 || uvLevel === 2){
            body=(
                <div style={{display:"flex", flexDirection:"row",marginLeft:"0.5em"}}>
                    <Typography variant={'body2'}
                    style={{textShadow:"2px 2px 4px green", fontWeight:"bold"}}
                    >
                    {uvLevel}
                    </Typography>
                    <HelpOutlineIcon onClick={handleOpen} fontSize="small" style={{marginLeft:"0.5em"}}/>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        <Typography variant={'body2'} className={classes.paper} style={modalStyle}>
                            <p><strong>Burn time:</strong> 60 minutes.</p>
                            <p><strong>Recommended protection: </strong>sunscreen, SPF 30+, sunglasses</p> 
                        </Typography>
                    </Modal>
                </div>
            );
        }
        else if(uvLevel >= 3 && uvLevel <=5){
            body=(
                <div style={{display:"flex", flexDirection:"row",marginLeft:"0.5em"}}>
                    <Typography variant={'body2'}
                    style={{textShadow:"2px 2px 4px #F9F105", fontWeight:"bold"}}
                    >
                    {uvLevel}
                    </Typography>
                    <HelpOutlineIcon onClick={handleOpen} fontSize="small" style={{marginLeft:"0.5em"}}/>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        <Typography variant={'body2'} className={classes.paper} style={modalStyle}>
                            <p><strong>Burn time:</strong> 45 minutes.</p>
                            <p><strong>Recommended protection: </strong>sunscreen, SPF 30+, sunglasses, hat</p> 
                        </Typography>
                    </Modal>
                </div>
            );
        }
        else if(uvLevel >= 6 && uvLevel <=7){
            body=(
                <div style={{display:"flex", flexDirection:"row",marginLeft:"0.5em"}}>
                    <Typography variant={'body2'}
                    style={{textShadow:"2px 2px 4px orange", fontWeight:"bold"}}
                    >
                    {uvLevel}
                    </Typography>
                    <HelpOutlineIcon onClick={handleOpen} fontSize="small" style={{marginLeft:"0.5em"}}/>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        <Typography variant={'body2'} className={classes.paper} style={modalStyle}>
                            <p><strong>Burn time:</strong> 30 minutes.</p>
                            <p><strong>Recommended protection: </strong>sunscreen, SPF 30+, sunglasses, hat, seek shade</p> 
                        </Typography>
                    </Modal>
                </div>
            );
        }
        else if(uvLevel >= 8 && uvLevel <=10){
            body=(
                <div style={{display:"flex", flexDirection:"row",marginLeft:"0.5em"}}>
                    <Typography variant={'body2'}
                    style={{textShadow:"2px 2px 4px red", fontWeight:"bold"}}
                    >
                    {uvLevel}
                    </Typography>
                    <HelpOutlineIcon onClick={handleOpen} fontSize="small" style={{marginLeft:"0.5em"}}/>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        <Typography variant={'body2'} className={classes.paper} style={modalStyle}>
                            <p><strong>Burn time:</strong> 15-25 minutes.</p>
                            <p><strong>Recommended protection: </strong>sunscreen, SPF 30+, sunglasses, hat, seek shade, protective clothing</p> 
                        </Typography>
                    </Modal>
                </div>
            );
        }
        else if(uvLevel >= 11){
            body=(
                <div style={{display:"flex", flexDirection:"row",marginLeft:"0.5em"}}>
                    <Typography variant={'body2'}
                    style={{textShadow:"2px 2px 4px purple", fontWeight:"bold"}}
                    >
                    {uvLevel}
                    </Typography>
                    <HelpOutlineIcon onClick={handleOpen} fontSize="small" style={{marginLeft:"0.5em"}}/>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <Typography variant={'body2'} className={classes.paper} style={modalStyle}>
                            <p><strong>Burn time:</strong> 15-25 minutes.</p>
                            <p><strong>Recommended protection: </strong>sunscreen, SPF 30+, sunglasses, hat, seek shade, protective clothing, if possible stay inside between 10am-4pm.</p> 
                        </Typography>
                    </Modal>
                    
                </div>
            );
        }
        return body;
    }
    
    var windImgSrc;
    switch(currentInfo.wind_dir){
        case "E":
            windImgSrc=windImages[0].default;
            break;
        case "ENE":
            windImgSrc=windImages[1].default;
            break;
        case "ESE":
            windImgSrc=windImages[2].default;
            break;
        case "N":
            windImgSrc=windImages[3].default;
            break;
        case "NE":
            windImgSrc=windImages[4].default;
            break;
        case "NNE":   
            windImgSrc=windImages[5].default;
            break;
        case "NNW":
            windImgSrc=windImages[6].default;
            break;
        case "NW":
            windImgSrc=windImages[7].default;
            break;
        case "S":
            windImgSrc=windImages[8].default;
            break;
        case "SE":
            windImgSrc=windImages[9].default;
            break;
        case "SSE":
            windImgSrc=windImages[10].default;
            break;
        case "SSW":
            windImgSrc=windImages[11].default;
            break;
        case "SW":
            windImgSrc=windImages[12].default;
            break;
        case "W":
            windImgSrc=windImages[13].default;
            break;
        case "WNW":
            windImgSrc=windImages[14].default;
            break;
        case "WSW":
            windImgSrc=windImages[15].default;
            break;
    }

    
    function getMoonPhase(moonPhase:string){
        var moonImgSrc:any;
        switch(moonPhase){
            case "First Quarter":
                moonImgSrc=moonImages[0].default;
                break;
            case "Full Moon":
                moonImgSrc=moonImages[1].default;
                break;
            case "Last Quarter":
                moonImgSrc=moonImages[2].default;
                break;
            case "New Moon":
                moonImgSrc=moonImages[3].default;
                break;
            case "Waning Crescent":
                moonImgSrc=moonImages[4].default;
                break;
            case "Waning Gibbous":   
                moonImgSrc=moonImages[5].default;
                break;
            case "Waxing Crescecnt":
                moonImgSrc=moonImages[6].default;
                break;
            case "Waxing Gibbous":
                moonImgSrc=moonImages[7].default;
                break;
        }

        var body = (
        <img src={moonImgSrc} alt={moonPhase} height={25} style={{marginLeft:"0.5em", marginRight:"0.5em"}}/> 
        );

        return body;
    }
    return (
        <div style={{fontSize:"1em"}}>
            <div style={{display:"flex", flexDirection:"row"}}>
                <div style={{marginLeft:"2em"}}>
                    <strong>{locationInfo.name}, {locationInfo.country}</strong>
                    <br/>
                    {changeCurrentDate(locationInfo.localtime)}
                    <div style={{left:"2em",top:"3em"}}>
                        {currentInfo.condition.text}
                        <br/>
                        <div style={{ fontSize:25,display:"flex", flexDirection:"row"}}>
                            <img src={currentInfo.condition.icon} alt={currentInfo.condition.text} />
                            <div style={{marginTop:"0.5em"}}>{currentInfo.temp_c}°C</div>
                        </div>
                    </div>
                </div>
                <div style={{marginLeft:"10%"}}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        UV: {checkUV(currentInfo.uv)}
                    </div>
                    <div style={{display:"flex", flexDirection:"row"}}>
                            Max UV: {checkUV(firstForecastInfo.day.uv)}
                    </div>
                    <div>Wind: <img src={windImgSrc} alt={currentInfo.wind_dir} height={25}/>{currentInfo.wind_kph} km/h </div>
                </div>
                <div style={{marginRight:"2em"}}>
                    <div>
                        MoonRise: {firstForecastInfo.astro.moonrise}
                    </div>
                    <div>
                        MoonSet: {firstForecastInfo.astro.moonset}
                    </div>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        Moon Phase: {getMoonPhase(firstForecastInfo.astro.moon_phase)} {firstForecastInfo.astro.moon_phase}
                    </div>
                    <div>
                        SunRise: {firstForecastInfo.astro.sunrise}
                    </div>
                    <div>
                        SunSet: {firstForecastInfo.astro.sunset}
                    </div>
                </div>
            </div>
            <div style={{position:"relative"}}>
                {firstDay()}
            </div>
            <div style={{marginLeft:"2em"}}>
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
                                    <p style={{display:"flex", flexDirection:"row"}}>Moon phase: {getMoonPhase(secondForecastInfo.astro.moon_phase)} {secondForecastInfo.astro.moon_phase}</p>
                                    <br/>
                                    <p>Sun rise: {secondForecastInfo.astro.sunrise}</p>
                                    <p>Sun set: {secondForecastInfo.astro.sunset}</p>
                                    <br/>
                                    <p style={{display:"flex", flexDirection:"row"}} >Max UV Level: {checkUV(secondForecastInfo.day.uv)}</p>
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
            <div style={{marginLeft:"2em"}}>
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
                                    <p style={{display:"flex", flexDirection:"row"}}>Moon phase: {getMoonPhase(thirdForecastInfo.astro.moon_phase)} {thirdForecastInfo.astro.moon_phase}</p>
                                    <br/>
                                    <p>Sun rise: {thirdForecastInfo.astro.sunrise}</p>
                                    <p>Sun set: {thirdForecastInfo.astro.sunset}</p>
                                    <br/>
                                    <p style={{display:"flex", flexDirection:"row"}}>Max UV Level: {checkUV(thirdForecastInfo.day.uv)}</p>
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