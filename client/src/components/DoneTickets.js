import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Label from './Label';
import Content from './Content';
import './style/Ticket.css';

function DoneTickets({ tickets, undoneThisTicket }) {

  const showAllComtent=(e)=>{
    let contentFather = e.target.closest('div');
    let content = contentFather.firstChild
    if(content.className==='content'){
      content.className = 'fullContent'
      e.target.innerText='see less' 
    }else{
      content.className = 'content'
      e.target.innerText='See more' 
    }
  }

  return (
    <div id="thisTicketsDone">
      <h1 id="listTitle">DONE TICKETS</h1>
      {
        tickets.map((value, i) => {
          if (value.done) {
            return (
              <div className="doneTicket" key={i}>
                <Card>
                  <h4 className="ticketTitle">{value.title}</h4>
                  <div>
                    <div className="content">
                      {value.content}
                      {/* <Content contentValue={value.content} /> */}
                    </div>
                    <Button id="seeMoreButton" onClick={(e)=>showAllComtent(e)}>See more</Button>
                  </div>
                  <div className="labelsContainer">
                    <Label labels={value.labels} />
                  </div>
                  <span className="userEmail">
                    By:
                    {value.userEmail}
                  </span>
                  <span className="date">
                    {' '}
                    date:
                    {new Date(value.creationTime).toLocaleString()}
                  </span>
                  <button className="doneButton" onClick={() => undoneThisTicket(value.id)}>Reopen ticket</button>
                </Card>
              </div>
            );
          }
        })
      }
    </div>
  );
}

export default DoneTickets;
