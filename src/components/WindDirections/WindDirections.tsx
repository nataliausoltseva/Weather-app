import React from 'react';
import { Images } from '../Images';

interface Props {
    windDirection?:string,
    windSpeed: number
}
export const WindDirections = (props: Props) => {
    function importAll(r:any) {
        return r.keys().map(r);
    }

    const windDirections = importAll(require.context('./', false, /.*\.PNG$/));
    return(
        <div>
            <Images list={windDirections} name={props.windDirection}/>
            {props.windSpeed} km/h
        </div>
    )
}