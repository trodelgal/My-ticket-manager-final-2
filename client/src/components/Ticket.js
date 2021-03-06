import React from 'react';
import DoneSharpIcon from '@material-ui/icons/DoneSharp';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import VisibilityOffSharpIcon from '@material-ui/icons/VisibilityOffSharp';
import Label from './Label';
import './style/Ticket.css';

function Ticket({
  tickets, hideTheTicket, hideTicketsList, doneThisTicket, restoreTickets,
}) {
  console.log(tickets);
  // NUMBER OF THE TICKETS IN THE HIDE LIST
  let numberOfTicketsInHideList = 0;
  let restoreButton = '';
  if (hideTicketsList[0] !== undefined) {
    numberOfTicketsInHideList = hideTicketsList.length;
    restoreButton = (
      <span>
        -
        <Button id="restoreHideTickets" onClick={restoreTickets}>restore</Button>
      </span>
    );
  }
  
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

  let openTikets=[]
  tickets.forEach(element => {
    if(!element.done)
    openTikets.push(element)
  });

  return (
    <div className="liveTicketList">
      <h1 id="listTitle">OPEN TICKETS</h1>
    
     
      {
        tickets.length===0?
        <div id="noResult">
          <SearchIcon id="SearchIcon"/>
          <h2>There are not search result</h2>
        </div>:
        <div id="results">
          Showing:
          {' '}
          {openTikets.length}
          {' '}
          results 
          <br/>
          (
                    <span id="hideTicketsCounter">{numberOfTicketsInHideList}</span>
          {' '}
          hidden tickets
          {restoreButton}
          )
        </div>
      }
      {
        tickets.map((value, i) => {
          if (!value.done) {
            let seeMoreButton='';
            if(value.content.length>350){
              seeMoreButton=<Button id="seeMoreButton" onClick={(e)=>showAllComtent(e)}>See more</Button>
            }
            return (
              <div className="ticket" key={i}>
                <Card>
                  <h4 className="ticketTitle">{value.title}</h4>
                  <div>
                    <div className="content">
                      {value.content}
                    </div>
                    {seeMoreButton}
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
                  <button className="hideTicketButton" onClick={() => hideTheTicket(i)}><VisibilityOffSharpIcon /></button>
                  <button className="doneButton" onClick={() => doneThisTicket(value.id)}><DoneSharpIcon /></button>
                </Card>
              </div>
            );
          }
        })
      }
    </div>
  );
}

export default Ticket;
