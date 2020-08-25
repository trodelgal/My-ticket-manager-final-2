import React, { useEffect, useState } from 'react';
import Label from './Label';


function Ticket({tickets, hideTheTicket, hideTicketsList, doneThisTicket}){
    //NUMBER OF THE TICKETS IN THE HIDE LIST
    let numberOfTicketsInHideList=0
    if(hideTicketsList[0]!==undefined){
        numberOfTicketsInHideList= hideTicketsList.length
    }
   
    return(
        <div>
            <div id="hideTicketsCounter">{numberOfTicketsInHideList}</div>              
            {
                tickets.map((value,i)=>{  
                    if(!value.done){ 
                    return(
                        <div className="ticket" key={i}>
                            <h5>{value.title}</h5>
                            <button className="hideTicketButton" onClick={()=>hideTheTicket(i)}>hide</button>
                            <div>{value.content}</div>
                            <span>By {value.userEmail}   </span>
                            <span> date: {new Date(value.creationTime).toLocaleString()}</span>
                            <Label labels={value.labels}/>
                            <button onClick={()=>doneThisTicket(value.id)}>done</button>
                        </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default Ticket;