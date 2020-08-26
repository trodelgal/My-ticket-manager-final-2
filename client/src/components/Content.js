import React, { useState } from 'react';
import './style/Main.css';
import Button from '@material-ui/core/Button';

function Content({ contentValue }) {
    const[contentText,setContentText] = useState(contentValue.slice(0,450));
    
    function showAllComtent() {
        if(contentText !== contentValue)
        setContentText(contentValue);
        else {
            setContentText(contentValue.slice(0,450));
        }
    }

    let seeMoreButton = '';
    if(contentValue.length>450) {
        seeMoreButton = <Button id = "seeMoreButton" onClick = {showAllComtent}>See more</Button>
    }

    return(
       <>
            <div className = "contentText">{contentText}{seeMoreButton}</div>
       </>
    
    );
}
   


export default Content;