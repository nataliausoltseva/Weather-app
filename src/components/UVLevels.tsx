import { makeStyles, Modal, Typography } from '@material-ui/core';
import React from 'react';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CloseIcon from '@material-ui/icons/Close';

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
      uvLevel:number;
  }
  
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

export const UVLevels = (props:Props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

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
                    <HelpOutlineIcon onClick={handleOpen} fontSize="small" className="HelpButton"/>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        <Typography component={"span"} variant={'body2'} className={classes.paper} style={modalStyle}>
                            <CloseIcon onClick={handleClose}/>
                            <p><strong>Burn time:</strong> 60 minutes.</p>
                            <p><strong>Recommended protection: </strong>sunscreen, SPF 30+, sunglasses</p> 
                            <p style={{fontSize:"10px"}}>This information is taken from <a href="https://yoursummerskin.com/blogs/news/74717701-do-you-know-your-region-s-uv-index-today">YourSummerSkin</a></p>
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
                    <HelpOutlineIcon onClick={handleOpen} fontSize="small" className="HelpButton"/>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        
                        <Typography component={"span"} variant={'body2'} className={classes.paper} style={modalStyle}>
                            <CloseIcon onClick={handleClose}/>
                            <p><strong>Burn time:</strong> 45 minutes.</p>
                            <p><strong>Recommended protection: </strong>sunscreen, SPF 30+, sunglasses, hat</p> 
                            <p style={{fontSize:"10px"}}>This information is taken from <a href="https://yoursummerskin.com/blogs/news/74717701-do-you-know-your-region-s-uv-index-today">YourSummerSkin</a></p>
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
                    <HelpOutlineIcon onClick={handleOpen} fontSize="small" className="HelpButton"/>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        
                        <Typography component={"span"} variant={'body2'} className={classes.paper} style={modalStyle}>
                            <CloseIcon onClick={handleClose}/>
                            <p><strong>Burn time:</strong> 30 minutes.</p>
                            <p><strong>Recommended protection: </strong>sunscreen, SPF 30+, sunglasses, hat, seek shade</p> 
                            <p style={{fontSize:"10px"}}>This information is taken from <a href="https://yoursummerskin.com/blogs/news/74717701-do-you-know-your-region-s-uv-index-today">YourSummerSkin</a></p>
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
                    <HelpOutlineIcon onClick={handleOpen} fontSize="small" className="HelpButton"/>

                    
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        <Typography component={"span"} variant={'body2'} className={classes.paper} style={modalStyle}>
                            <CloseIcon onClick={handleClose}/>
                            <p><strong>Burn time:</strong> 15-25 minutes.</p>
                            <p><strong>Recommended protection: </strong>sunscreen, SPF 30+, sunglasses, hat, seek shade, protective clothing</p> 
                            <p style={{fontSize:"10px"}}>This information is taken from <a href="https://yoursummerskin.com/blogs/news/74717701-do-you-know-your-region-s-uv-index-today">YourSummerSkin</a></p>
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
                    <HelpOutlineIcon onClick={handleOpen} fontSize="small" className="HelpButton"/>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <Typography component={"span"} variant={'body2'} className={classes.paper} style={modalStyle}>
                            <CloseIcon onClick={handleClose} className="CloseIcon"/>
                                <p><strong>Burn time:</strong> 15-25 minutes.</p>
                                <p><strong>Recommended protection: </strong>sunscreen, SPF 30+, sunglasses, hat, seek shade, protective clothing, if possible stay inside between 10am-4pm.</p> 
                                <p style={{fontSize:"10px"}}>This information is taken from <a href="https://yoursummerskin.com/blogs/news/74717701-do-you-know-your-region-s-uv-index-today">YourSummerSkin</a></p>
                        </Typography>
                    </Modal>
                    
                </div>
            );
        }
        return body;
    }
    return(
        <div>
            {checkUV(props.uvLevel)}
        </div>
    )
}