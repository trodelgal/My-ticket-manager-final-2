import React, { useEffect, useState } from 'react';
import Label from './Label';
import './Ticket.css';
import DoneSharpIcon from '@material-ui/icons/DoneSharp';
import Card from '@material-ui/core/Card';
import VisibilityOffSharpIcon from '@material-ui/icons/VisibilityOffSharp';



function Ticket({tickets, hideTheTicket, hideTicketsList, doneThisTicket,restoreTickets}){
    //NUMBER OF THE TICKETS IN THE HIDE LIST
    let numberOfTicketsInHideList=0
    let restoreButton = '';
    if(hideTicketsList[0]!==undefined){
        numberOfTicketsInHideList= hideTicketsList.length
        restoreButton=<span>- <button id="restoreHideTickets" onClick={restoreTickets}>restore</button></span>;
    }

    
    return(
        <div className="liveTicketList">
            <h1 id="listTitle">TICKETS</h1>
            <div id="results">Showing {tickets.length} results (<span id="hideTicketsCounter">{numberOfTicketsInHideList}</span> hidden tickets {restoreButton})</div> 
                         
            {
                tickets.map((value,i)=>{  
                    if(!value.done){ 
                    return(
                        <div className="ticket" key={i}>
                            <Card>
                                <h4 className="ticketTitle">{value.title}</h4>
                                <div className="content">{value.content}</div>
                                <div className="labelsContainer">
                                <Label labels={value.labels}/>
                                </div>
                                <span className="userEmail">By {value.userEmail}</span>
                                <span className="date"> date: {new Date(value.creationTime).toLocaleString()}</span>
                                <button className="hideTicketButton" onClick={()=>hideTheTicket(i)}><VisibilityOffSharpIcon/></button>
                                <button className="doneButton" onClick={()=>doneThisTicket(value.id)}><DoneSharpIcon/></button>
                            </Card>
                        </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default Ticket;