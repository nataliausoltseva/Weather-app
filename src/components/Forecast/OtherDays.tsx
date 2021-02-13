import React from 'react';
import { PopUp } from '../PopUp';

interface Props {
    forecastList :any;
}
export const OtherDays = (props:Props) => {
    function secondDay(){
        var secondHours = [];
        var conditions:any = [{}];
        var modeMap:any = {};
        var maxCount = 1;
        var index = 0;
        for(var i=0; i<props.forecastList.hour.length;i++){
            var newDate =  new Date(props.forecastList.hour[i].time);
            var time = `${newDate.getHours()}:00`;
            secondHours.push({"hour":time, "icon":props.forecastList.hour[i].condition.icon, "text":props.forecastList.hour[i].condition.text, "temp_c":props.forecastList.hour[i].temp_c,"rain_chance":props.forecastList.hour[i].chance_of_rain,"snow_chance":props.forecastList.hour[i].chance_of_snow});
            conditions.push(
                {text: props.forecastList.hour[i].condition.text, 
                icon: props.forecastList.hour[i].condition.icon,
                rain_chance: props.forecastList.hour[i].chance_of_rain,
                snow_chance:props.forecastList.hour[i].chance_of_snow});        
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
            <div style={{marginLeft:"5em", display:'flex', flexDirection:'column',justifyContent:"center", alignItems:"center"}}>
                <strong><div style={{justifyContent:"center"}}>{conditions[index].rain_chance>0?`${conditions[index].rain_chance}%`:""}</div></strong><strong><div>{conditions[index].snow_chance>0?`${conditions[index].snow_chance}%`:""}</div></strong>
                <img src={conditions[index].icon} alt={conditions[index].text} />
                <h4>Max: {props.forecastList.day.maxtemp_c}°C</h4>
                    Min: {props.forecastList.day.mintemp_c}°C
            </div>
        );
        return body;
    }
    return (
        <div style={{display:"flex"}}>
            <PopUp forecast={props.forecastList}/>
            {secondDay()}
        </div>
    )
}