import React, { useEffect, useState } from 'react';
import Label from './Label';
import axios from 'axios';


function Ticket({tickets, toHide, hiddenTickets}){
    let num=0
    if(hiddenTickets[0]!==undefined){
        num= hiddenTickets.length
    }
   
    return(
        <div>
            <div>{num}</div>              
            {
                tickets.map((value,i)=>{   
                    return(
                        <div className="ticket" key={i}>
                            <h5>{value.title}</h5>
                            <button className="hideTicketButton" onClick={()=>toHide(i)}>hide</button>
                            <div>{value.content}</div>
                            <span>By {value.userEmail}   </span>
                            <span> date: {new Date(value.creationTime).toLocaleString()}</span>
                            <Label labels={value.labels}/>
                        </div>
                        )
                })
            }
        </div>
    )
}

export default Ticket;