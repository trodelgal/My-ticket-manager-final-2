import React from 'react';
import './style/Label.css';

function Labels({ labels }) {
    //CHECK IF THE TICKET HAS LABELS
    let realLabels = [];
    if(labels !== undefined) {
        realLabels = labels;
    }
    return(
        <>
            {
                realLabels.map((value,i) => {
                    return(
                    <div className = "label" key = {i}>{value}</div>
                    );
                })
            }
        </>
    );
}

export default Labels;