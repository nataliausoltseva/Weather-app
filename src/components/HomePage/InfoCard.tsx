import moment from 'moment';
import React from 'react';
import ChangeDate from '../ChangeDate';
import { UVLevels } from '../UVLevels';
import { WindDirections } from '../WindDirections/WindDirections';

interface Props {
    locationInfo:any;
    currentInfo: any;
}
export const InfoCard = (props: Props) => {
    function changeCurrentDate(date:string){
        var dateValue = ChangeDate(date);
        var newDate = new Date(date);
        return `${dateValue} ${moment(newDate).format("HH:mm")}`;

    }
    return(
        <div>
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
            <div style={{display:"flex", flexDirection:"row"}}>
                UV: <UVLevels uvLevel={props.currentInfo.uv} />
            </div>
            <div>Wind: <WindDirections windDirection={props.currentInfo.wind_dir} windSpeed={props.currentInfo.wind_kph}/> </div>
        </div>
    )
}