import React, { useEffect, useState } from 'react';
import Label from './Label';


function Ticket({tickets}){
    // const sliceTick= tickets.slice(0,1)
    return(
        <div className="ticket" style={{}}>                  
            {
                tickets.map((value,i)=>{            
                    return(
                        <div key={i}>
                            <div>{value.title}</div>
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