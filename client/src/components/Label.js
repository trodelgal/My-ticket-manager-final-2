import React, { useEffect, useState } from 'react';

function Labels({labels}){
    //CHECK IF THE TICKET HAS LABELS
    let realLabels=[];
    if(labels!==undefined){
        realLabels=labels
    }
    return(
        <div>
            {
                realLabels.map((value,i)=>{
                    return(
                    <div className="label" key={i}>{value}</div>
                    )
                })
            }
        </div>
    )
}

export default Labels;