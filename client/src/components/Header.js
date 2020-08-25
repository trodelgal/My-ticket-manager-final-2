import React, { useEffect, useState } from 'react';

function Header(){
  
    return(
        <header>
            <h2 style={{color:'white', top: 0}}>TICKET MANAGER</h2>
            <button> <a href="#doneTickets">go to done tickets</a></button>
        </header>
    )
}

export default Header;