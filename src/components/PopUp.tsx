import { Popover, Box, Typography } from '@material-ui/core';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import React from 'react';
import ChangeDate from './ChangeDate';
import { MoonPhases } from './MoonPhases/MoonPhases';
import { UVLevels } from './UVLevels';
import { WindDirections } from './WindDirections/WindDirections';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface Props {
    forecast: any;
}
export const PopUp = (props:Props) => {

    return(
        <strong style={{textAlign:"left",display:"flex", flexDirection:"row"}}>
            <div style={{display:"flex", flexDirection:"row"}}>
                {ChangeDate(props.forecast.date)}
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
                            <div>Moon rise: {props.forecast.astro.moonrise}</div>
                            <div>Moon set: {props.forecast.astro.moonset}</div>
                            <div style={{display:"flex", flexDirection:"row"}}>Moon phase: <MoonPhases moonPhase={props.forecast.astro.moon_phase}/></div>
                            <br/>
                            <div>Sun rise: {props.forecast.astro.sunrise}</div>
                            <div>Sun set: {props.forecast.astro.sunset}</div>
                            <br/>
                            <div style={{display:"flex", flexDirection:"row"}}>Max UV Level: <UVLevels uvLevel={props.forecast.day.uv}/></div>
                            <div>Wind speed: <WindDirections windSpeed={props.forecast.day.maxwind_kph}/></div>
                        </Typography>
                        </Box>
                    </Popover>
                    </div>
                )}
                </PopupState>    
            </div>
        </strong>
    )
}