import React, { useEffect, useState } from 'react';
import Ticket from './Ticket'
import DoneTickets from './DoneTickets'
import axios from 'axios';
import './style/Main.css';
import Button from '@material-ui/core/Button';

function Main(){
    //STATES
    const[tickets,setTickets]= useState([]);
    const[search, setSearch]=useState('');
    const[hideTicketsList, setHideTicketsList]= useState([])

    //ON LOAD AND SEARCH BRING THE RELEVANT TICKETS FROM SERVER
    useEffect(()=>{
        const showSearch= async()=>{
            const response = await axios.get(`/api/tickets?searchText=${search}`)
            console.log(response);
            setTickets(response.data)
            setHideTicketsList([])
        }
        showSearch();
    },[search]);

    //HIDE THE TICKET ON HIDE BUTTON CLICK
    function hideTheTicket(i){
        console.log(i);
        setTickets(tickets.filter((item,index)=>{
            return index !== i
        }))
        setHideTicketsList([...hideTicketsList,tickets[i]])
    }
    //RETURN THE HIDE TICKETS ON RESTORE BUTTON CLICK
    function restoreTickets(){
        console.log(hideTicketsList);
        setTickets(hideTicketsList.concat(tickets))
        setHideTicketsList([])
    }
    //MOVE THE TICKET TO DONE LIST
    async function doneThisTicket(id){
        const response = await axios.post(`/api/tickets/${id}/done`);
        const newTicketList = await axios.get(`/api/tickets?searchText=${search}`)
        setTickets(newTicketList.data)
    }
    //MOVE BACK THE TICKET TO TICKETS LIST
    async function undoneThisTicket(id){
        const response = await axios.post(`/api/tickets/${id}/undone`);
        const newTicketList = await axios.get(`/api/tickets?searchText=${search}`)
        setTickets(newTicketList.data)
    }

    return(
        <>
            <div id="searchLine"> 
                <h1>TICKET MANAGER</h1>
                <input id="searchInput" placeholder='Search tickets' onChange={e => setSearch(e.target.value)}/>
                <div id="navButtons">
                    <Button> <a href="#doneTickets">show the done tickets</a></Button>       
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