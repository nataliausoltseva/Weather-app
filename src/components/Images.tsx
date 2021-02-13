import React from 'react';

interface Props{
    list:any,
    name?:string,
    handleOnClick?: () => void
}
export const Images = (props:Props)=> {
    function getSrc(){
        for(var i =0; i< props.list.length; i++){
            if(props.list[i].default.includes(props.name)){
                return props.list[i].default;
            }            
        }
    }
    return(
        <img src={getSrc()} alt={props.name} height={25} onClick={props.handleOnClick} />
    )
}