import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Label from './Label';
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
  let doneTikets=[]
  tickets.forEach(element => {
    if(element.done)
    doneTikets.push(element)
  });

  return (
    <div id="thisTicketsDone">
      <h1 id="listTitle">DONE TICKETS</h1>
      {doneTikets.length===0?
      <div>there aren't done tickets</div>:
        <div id="results">
          Showing:
          {' '}
          {doneTikets.length}
          {' '}
          results
        </div>
      }
      {
        tickets.length===0 &&
        <div id="noResult">
          <SearchIcon/>
          <p>No result</p>
        </div>
      }
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
