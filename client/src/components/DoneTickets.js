import React from 'react';
import Card from '@material-ui/core/Card';
import Label from './Label';
import Content from './Content';
import './style/Ticket.css';


function DoneTickets({ tickets, undoneThisTicket }) {
  
    return(
        <div id = "thisTicketsDone">
            <h1 id = "listTitle">DONE TICKETS</h1>
            {
                tickets.map((value,i) => {  
                    if(value.done) { 
                    return(
                        <div className = "doneTicket" key = {i}>
                            <Card>
                                <h4 className = "ticketTitle">{value.title}</h4>
                                <div className = "content">
                                    <Content contentValue = {value.content}/>
                                </div>
                                <div className = "labelsContainer">
                                    <Label labels = {value.labels}/>
                                </div>
                                <span className = "userEmail">By: {value.userEmail}   </span>
                                <span className = "date"> date: {new Date(value.creationTime).toLocaleString()}</span>
                                <button className = "doneButton" onClick = {() => undoneThisTicket(value.id)}>Back to tickets</button>
                            </Card>
                        </div>
                        )
                    }
                })
            }
        </div>
    );
}

export default DoneTickets;