import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Ticket from './Ticket'
import DoneTickets from './DoneTickets'
import axios from 'axios';
import './style/Main.css';

function Main(){
    //STATES
    const[tickets,setTickets]= useState([]);
    const[search, setSearch]=useState('');
    const[hideTicketsList, setHideTicketsList]= useState([])

    //ON LOAD AND SEARCH BRING THE RELEVANT TICKETS FROM SERVER
    useEffect(()=>{
        const showSearch= async()=>{
            const response = await axios.get(`/api/tickets?searchText=${search}`)
            setTickets(response.data)
            setHideTicketsList([])
        }
        showSearch();
    },[search]);

    //HIDE THE TICKET ON HIDE BUTTON CLICK
    function hideTheTicket(i){
        setTickets(tickets.filter((item,index)=>{
            return index !== i
        }))
        setHideTicketsList([...hideTicketsList,tickets[i]])
    }
    //RETURN THE HIDE TICKETS ON RESTORE BUTTON CLICK
    function restoreTickets(){
        setTickets(hideTicketsList.concat(tickets))
        setHideTicketsList([])
    }
    //MOVE THE TICKET TO DONE LIST
    async function doneThisTicket(id){
        await axios.post(`/api/tickets/${id}/done`);
        const newTicketList = await axios.get(`/api/tickets?searchText=${search}`)
        setTickets(newTicketList.data)
    }
    //MOVE BACK THE TICKET TO TICKETS LIST
    async function undoneThisTicket(id){
        await axios.post(`/api/tickets/${id}/undone`);
        const newTicketList = await axios.get(`/api/tickets?searchText=${search}`)
        setTickets(newTicketList.data)
    }

    return(
        <>
            <div id="searchLine"> 
                <div id="webTitle">
                    <h1 id="mainTitle">TICKET MANAGER</h1>
                    <p id="secondTitle">WE HERE TO HELP OUR CLIENTS</p>
                </div>
                <input id="searchInput" placeholder='Search tickets' onChange={e => setSearch(e.target.value)}/>
                <div id="navButtons">
                    <Button> <a href="#doneTickets">done tickets</a></Button>       
                    <Button><a href="#listTitle">tickets</a></Button>
                </div>
            </div>
            <div className="mainPart">  
                <Ticket id="theTickets"tickets={tickets} hideTheTicket={hideTheTicket} hideTicketsList={hideTicketsList} doneThisTicket={doneThisTicket} restoreTickets={restoreTickets} />
                <DoneTickets id="theDoneTickets" tickets={tickets} undoneThisTicket={undoneThisTicket}/>
            </div>
        </>
    )
}

export default Main;