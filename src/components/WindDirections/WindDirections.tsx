import React from 'react';

interface Props {
    windDirection?:string,
    windSpeed: number
}
const windDirections = importAll(require.context('./', false, /.*\.png$/));
function importAll(r:any) {
    return r.keys().map(r);
}
console.log(windDirections);


export const WindDirections = (props: Props) => {
    function getImage(){
        switch(props.windDirection){
            case "E":
                return windDirections[0].default;
            case "ENE":
                return windDirections[1].default;
            case "EESE":
                return windDirections[2].default;
            case "N":
                return windDirections[3].default;
            case "NE":
                return windDirections[4].default;
            case "NNE":
                return windDirections[5].default;
            case "NNW":
                return windDirections[6].default;
            case "NW":
                return windDirections[7].default;
            case "S":
                return windDirections[8].default;
            case "SE":
                return windDirections[9].default;
            case "SSE":
                return windDirections[10].default;
            case "SSW":
                return windDirections[11].default;
            case "SW":
                return windDirections[12].default;
            case "W":
                return windDirections[13].default;
            case "WNW":
                return windDirections[14].default;
            case "WSW":
                return windDirections[15].default;
        }
    }
    return(
        <div>
            <img src={getImage()} alt={props.windDirection} height={25}/>
            {props.windSpeed} km/h
        </div>
    )
}