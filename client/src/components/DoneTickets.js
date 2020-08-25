import React, { useEffect, useState } from 'react';
import Label from './Label';

function DoneTickets({tickets,undoneThisTicket,hideTheTicket}){
  
    return(
        <div>
            <h1>done list</h1>
            {
                tickets.map((value,i)=>{  
                    if(value.done){ 
                    return(
                        <div className="ticket" key={i}>
                            <h5>{value.title}</h5>
                            <div>{value.content}</div>
                            <span>By {value.userEmail}   </span>
                            <span> date: {new Date(value.creationTime).toLocaleString()}</span>
                            <Label labels={value.labels}/>
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