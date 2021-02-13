import { Grid } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import ChangeDate from '../ChangeDate';
import { MoonPhases } from '../MoonPhases/MoonPhases';
import { UVLevels } from '../UVLevels';
import { WindDirections } from '../WindDirections/WindDirections';

interface Props{
    locationInfo:any;
    currentInfo: any;
    forecast: any;
}
export const TodaysInfo = (props: Props) => {
    function changeCurrentDate(date:string){
        var dateValue = ChangeDate(date);
        var newDate = new Date(date);
        return `${dateValue} ${moment(newDate).format("HH:mm")}`;

    }
    return (
        <Grid container direction="row" justify="center" alignItems="baseline" spacing={5}>
                <Grid item md={3} >
                    <strong>{props.locationInfo.name}, {props.locationInfo.country}</strong>
                        <br/>
                        {changeCurrentDate(props.locationInfo.localtime)}
                        <div >
                            {props.currentInfo.condition.text}
                        <br/>
                        <div style={{ fontSize:25,display:"flex", flexDirection:"row"}}>
                            <img src={props.currentInfo.condition.icon} alt={props.currentInfo.condition.text} />
                        <div style={{marginTop:"0.5em"}}>{props.currentInfo.temp_c}°C</div>
                        </div>
                    </div>
                </Grid>
                <Grid  item md={3} >
                    <div style={{display:"flex", flexDirection:"row"}}>
                        UV: <UVLevels uvLevel={props.currentInfo.uv} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row"}}>
                            Max UV: <UVLevels uvLevel={props.forecast.day.uv} />
                    </div>
                    <div>Wind: <WindDirections windDirection={props.currentInfo.wind_dir} windSpeed={props.currentInfo.wind_kph}/> </div>
                </Grid>
                <Grid  item md={3}>
                    <div>
                        MoonRise: {props.forecast.astro.moonrise}
                    </div>
                    <div>
                        MoonSet: {props.forecast.astro.moonset}
                    </div>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        Moon Phase: <MoonPhases moonPhase={props.forecast.astro.moon_phase}/>
                    </div>
                    <div>
                        SunRise: {props.forecast.astro.sunrise}
                    </div>
                    <div>
                        SunSet: {props.forecast.astro.sunset}
                    </div>
                </Grid>                
            </Grid>
    )
}