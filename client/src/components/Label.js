import React, { useEffect, useState } from 'react';

function Labels({labels}){
    let realLabels=[];
    if(labels!==undefined){
        realLabels=labels
    }
    return(
        <div className="lable">
            {
                realLabels.map((value,i)=>{
                    return(
                    <div key={i}>{value}</div>
                    )
                })
            }
        </div>
    )
}

export default Labels;