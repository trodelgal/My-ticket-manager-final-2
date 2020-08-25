import React, { useEffect, useState } from 'react';
import Ticket from './Ticket'
import DoneTickets from './DoneTickets'
import axios from 'axios';

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
    async function doneThisTicket(id){
        const response = await axios.post(`/api/tickets/${id}/done`);
        const newTicketList = await axios.get(`/api/tickets?searchText=${search}`)
        setTickets(newTicketList.data)
    }
    async function undoneThisTicket(id){
        const response = await axios.post(`/api/tickets/${id}/undone`);
        const newTicketList = await axios.get(`/api/tickets?searchText=${search}`)
        setTickets(newTicketList.data)
    }

    return(
        <div>        
            <input id="searchInput" placeholder='Search products' onChange={e => setSearch(e.target.value)}/>
            <button id="restoreHideTickets" onClick={restoreTickets}>restore</button>  
            <div className="mainPart">  
                <Ticket tickets={tickets} hideTheTicket={hideTheTicket} hideTicketsList={hideTicketsList} doneThisTicket={doneThisTicket} />
                <DoneTickets tickets={tickets} undoneThisTicket={undoneThisTicket}/>
            </div>
        </div>
    )
}

export default Main;