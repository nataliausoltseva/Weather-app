import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
interface Props {
    forecastList :any;
    locationInfo: any;
}
export const FirstDay = (props:Props) => {
    function firstDay(){
        var first_hours = [];
        for(var i=0; i<props.forecastList.hour.length;i++){
            var newDate =  new Date(props.forecastList.hour[i].time);
            var today = new Date(props.locationInfo.localtime);
            var newMin = newDate.getHours()*60 + newDate.getMinutes();
            var todayMin = today.getHours()*60 + today.getMinutes();
            if(newMin > todayMin){
                var time = `${newDate.getHours()}:00`;
                first_hours.push({"hour":time, "icon":props.forecastList.hour[i].condition.icon, "text":props.forecastList.hour[i].condition.text, "temp_c":props.forecastList.hour[i].temp_c,"rain_chance":props.forecastList.hour[i].chance_of_rain,"snow_chance":props.forecastList.hour[i].chance_of_snow});
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
    return(
        <div>
            {firstDay()}
        </div>
    )
}