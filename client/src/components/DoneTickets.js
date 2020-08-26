import React, { useEffect, useState } from 'react';
import Label from './Label';
import Content from './Content';
import './style/Ticket.css';
import Card from '@material-ui/core/Card';


function DoneTickets({tickets,undoneThisTicket,hideTheTicket}){
  
    return(
        <div id="doneTickets">
            <h1 id="listTitle">DONE TICKETS</h1>
            {
                tickets.map((value,i)=>{  
                    if(value.done){ 
                    return(
                        <div className="ticket" key={i}>
                            <Card>
                                <h4 className="ticketTitle">{value.title}</h4>
                                <div className="content">
                                <Content contentValue={value.content}/>
                                </div>
                                <div className="labelsContainer">
                                <Label labels={value.labels}/>
                                </div>
                                <span className="userEmail">By: {value.userEmail}   </span>
                                <span className="date"> date: {new Date(value.creationTime).toLocaleString()}</span>
                                <button className="doneButton" onClick={()=>undoneThisTicket(value.id)}>Back to tickets</button>
                            </Card>
                        </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default DoneTickets;