import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import './style/SideBar.css';


const SideBar = ({ showDoneTickets, showOpenTickets, options, setOptions }) =>{
    const [openSideBar, setOpenSideBar]= useState(false);
   
return(
    <div  id="sidebar">
    {
        !openSideBar? 
        <Button color="secondary" onClick={()=>{setOpenSideBar(!openSideBar)}}>
            <MenuIcon id="MenuIcon"/>
        </Button>:
        <>
         <Button color="secondary" onClick={()=>{setOpenSideBar(!openSideBar)}}>
            <MenuIcon/>
        </Button>
        <Button color="secondary" onClick={showDoneTickets}>
            Done tickets
        </Button>
        <Button color="secondary" onClick={showOpenTickets}>
             Open tickets
        </Button>
        </>

    }
        
    </div>
)
}

export default SideBar