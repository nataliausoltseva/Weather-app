import { makeStyles, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { Images } from '../Images';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: "50%",
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
  }));
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
  
  interface Props {
      moonPhase: string;
  }
export const MoonPhases = (props: Props) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    function importAll(r:any) {
        return r.keys().map(r);
    }

    const moonImages = importAll(require.context('./', false, /.*\.PNG$/));
    const [openMoonPhaseModal, setOpenMoonPhaseModal] = React.useState(false);
    const handleOpenMoonPhaseModal = () => {
        setOpenMoonPhaseModal(true);
      };
    
    const handleCloseMoonPhaseModal = () => {
        setOpenMoonPhaseModal(false);
    };
    function openModal(moonPhase:string){
        var moonPhaseCard:any;
        switch(moonPhase){
            case "First Quarter":
                moonPhaseCard=(
                    <Typography component={'span'} variant={'body2'} className={classes.paper} style={modalStyle}>
                        <CloseIcon onClick={handleCloseMoonPhaseModal} className="CloseIcon"/>
                        <h2 style={{textAlign:"center"}}>{moonPhase}</h2>
                        <p>The first quarter moon (or a half moon) is when half of the lit portion of the Moon is visible after the waxing crescent phase. It comes a week after new moon.</p> 
                        <p style={{fontSize:"10px"}}>This information is taken from <a href="https://simple.wikipedia.org/wiki/Phases_of_the_Moon">Wikipedia</a></p>
                    </Typography>
                );
                break;
            case "Full Moon":
                moonPhaseCard=(
                    <Typography component={'span'} variant={'body2'} className={classes.paper} style={modalStyle}>
                        <CloseIcon onClick={handleCloseMoonPhaseModal} className="CloseIcon"/>
                        <h2 style={{textAlign:"center"}}>{moonPhase}</h2>
                        <p>A Full Moon is when we can see the entire lit portion of the Moon. The full moon phase occurs when the Moon is on the opposite side of the Earth from the Sun, called opposition. A lunar eclipse can only happen at full moon.</p> 
                        <p style={{fontSize:"10px"}}>This information is taken from <a href="https://simple.wikipedia.org/wiki/Phases_of_the_Moon">Wikipedia</a></p>
                    </Typography>
                );
                break;
            case "Last Quarter":
                moonPhaseCard=(
                    <Typography component={'span'} variant={'body2'} className={classes.paper} style={modalStyle}>
                        <CloseIcon onClick={handleCloseMoonPhaseModal} className="CloseIcon"/>
                        <h2 style={{textAlign:"center"}}>{moonPhase}</h2>
                        <p>The last quarter moon (or a half moon) is when half of the lit portion of the Moon is visible after the waning gibbous phase.</p> 
                        <p style={{fontSize:"10px"}}>This information is taken from <a href="https://simple.wikipedia.org/wiki/Phases_of_the_Moon">Wikipedia</a></p>
                    </Typography>
                );
                break;
            case "New Moon":
                moonPhaseCard=(
                    <Typography component={'span'} variant={'body2'} className={classes.paper} style={modalStyle}>
                        <CloseIcon onClick={handleCloseMoonPhaseModal} className="CloseIcon"/>
                        <h2 style={{textAlign:"center"}}>{moonPhase}</h2>
                        <p>A new moon is when the Moon cannot be seen because we are looking at the unlit half of the Moon. The new moon phase occurs when the Moon is directly between the Earth and Sun. A solar eclipse can only happen at new moon.</p> 
                        <p style={{fontSize:"10px"}}>This information is taken from <a href="https://simple.wikipedia.org/wiki/Phases_of_the_Moon">Wikipedia</a></p>
                    </Typography>
                );
                break;
            case "Waning Crescent":
                moonPhaseCard=(
                    <Typography component={'span'} variant={'body2'} className={classes.paper} style={modalStyle}>
                        <CloseIcon onClick={handleCloseMoonPhaseModal} className="CloseIcon"/>
                        <h2 style={{textAlign:"center"}}>{moonPhase}</h2>
                        <p>A waning crescent moon is when the Moon looks like a crescent and the crescent decreases ("wanes") in size from one day to the next.</p> 
                        <p style={{fontSize:"10px"}}>This information is taken from <a href="https://simple.wikipedia.org/wiki/Phases_of_the_Moon">Wikipedia</a></p>
                    </Typography>
                );
                break;
            case "Waning Gibbous":   
                moonPhaseCard=(
                    <Typography component={'span'} variant={'body2'} className={classes.paper} style={modalStyle}>
                        <CloseIcon onClick={handleCloseMoonPhaseModal} className="CloseIcon"/>
                        <h2 style={{textAlign:"center"}}>{moonPhase}</h2>
                        <p>A waning gibbous moon occurs when more than half of the lit portion of the Moon can be seen and the shape decreases ("wanes") in size from one day to the next. The waning gibbous phase occurs between the full moon and third quarter phases.</p> 
                        <p style={{fontSize:"10px"}}>This information is taken from <a href="https://simple.wikipedia.org/wiki/Phases_of_the_Moon">Wikipedia</a></p>
                    </Typography>
                );
                break;
            case "Waxing Crescecnt":
                moonPhaseCard=(
                    <Typography component={'span'} variant={'body2'} className={classes.paper} style={modalStyle}>
                        <CloseIcon onClick={handleCloseMoonPhaseModal} className="CloseIcon"/>
                        <h2 style={{textAlign:"center"}}>{moonPhase}</h2>
                        <p>A waxing crescent moon is when the Moon looks like a crescent and the crescent increases ("waxes") in size from one day to the next. This phase is usually only seen in the west.</p> 
                        <p style={{fontSize:"10px"}}>This information is taken from <a href="https://simple.wikipedia.org/wiki/Phases_of_the_Moon">Wikipedia</a></p>
                    </Typography>
                );
                break;
            case "Waxing Gibbous":
                moonPhaseCard=(
                    <Typography component={'span'} variant={'body2'} className={classes.paper} style={modalStyle}>
                        <CloseIcon onClick={handleCloseMoonPhaseModal} className="CloseIcon"/>
                        <h2 style={{textAlign:"center"}}>{moonPhase}</h2>
                        <p>A waxing gibbous moon occurs when more than half of the lit portion of the Moon can be seen and the shape increases ("waxes") in size from one day to the next. The waxing gibbous phase occurs between the first quarter and full moon phases.</p> 
                        <p style={{fontSize:"10px"}}>This information is taken from <a href="https://simple.wikipedia.org/wiki/Phases_of_the_Moon">Wikipedia</a></p>
                    </Typography>
                );
                break;
        }

        return moonPhaseCard;
    }
    return(
        <div>
            <Images list={moonImages} name={props.moonPhase} /> {props.moonPhase}
            <button onClick={()=> handleOpenMoonPhaseModal()}>click</button>
            <Modal
                open={openMoonPhaseModal}
                onClose={handleCloseMoonPhaseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <div>{openModal(props.moonPhase)}</div>

            </Modal>
        </div>
    );
}