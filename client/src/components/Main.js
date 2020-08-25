import React, { useEffect, useState } from 'react';
import Ticket from './Ticket'
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

    return(
        <div>        
            <input id="searchInput" placeholder='Search products' onChange={e => setSearch(e.target.value)}/>
            <button id="restoreHideTickets" onClick={restoreTickets}>restore</button>    
            <Ticket tickets={tickets} hideTheTicket={hideTheTicket} hideTicketsList={hideTicketsList} />
        </div>
    )
}

export default Main;