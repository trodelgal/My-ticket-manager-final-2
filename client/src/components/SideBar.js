import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './style/SideBar.css';


const SideBar = ({ showDoneTickets, showOpenTickets }) =>{
    const [openSideBar, setOpenSideBar]= useState(false);
    
   
return(
    <>
    {
        !openSideBar? 
        <Button id="menuButton" onClick={()=>{setOpenSideBar(!openSideBar)}}>
            <MenuIcon id="MenuIcon"/>
        </Button>:''
    }
    {
        <div style={{width:!openSideBar?'0%':'20%'}}  id="sidebar">
            <Button  onClick={()=>{setOpenSideBar(!openSideBar)}}>
                <ArrowForwardIcon id="ArrowForwardIcon"/>
            </Button>
            <Button  onClick={showDoneTickets}>
                Done tickets
            </Button>
            <Button id="openTicketsButton" onClick={showOpenTickets}>
                Open tickets
            </Button>
        </div>

    }
        
    </>
)
}

export default SideBar