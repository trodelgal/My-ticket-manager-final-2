import React, { useEffect, useState } from 'react';
import Label from './Label';
import './Ticket.css';

function DoneTickets({tickets,undoneThisTicket,hideTheTicket}){
  
    return(
        <div id="doneTickets">
            <h1>DONE TICKETS</h1>
            <button><a href="#listTitle">go to tickets</a></button>
            {
                tickets.map((value,i)=>{  
                    if(value.done){ 
                    return(
                        <div className="ticket" key={i}>
                            <h5>{value.title}</h5>
                            <div>{value.content}</div>
                            <Label labels={value.labels}/>
                            <span>By {value.userEmail}   </span>
                            <span> date: {new Date(value.creationTime).toLocaleString()}</span>
                            <button onClick={()=>undoneThisTicket(value.id)}>undone</button>
                        </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default DoneTickets;