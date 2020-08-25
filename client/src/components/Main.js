import React, { useEffect, useState } from 'react';
import Ticket from './Ticket'
import axios from 'axios';

function Main(){
    const[tickets,setTickets]= useState([]);
    const[search, setSearch]=useState('');
    const[hiddenTickets, setHiddenTickets]= useState([])


    useEffect(()=>{
        const showSearch= async()=>{
            const response = await axios.get(`/api/tickets?searchText=${search}`)
            setTickets(response.data)
        }
        showSearch();
    },[search]);

    function toHide(i){
        console.log(i);
        setTickets(tickets.filter((item,index)=>{
            return index !== i
        }))
        setHiddenTickets([...hiddenTickets,tickets[i]])
    }
    function restoreTickets(){
        console.log(hiddenTickets);
        setTickets(hiddenTickets.concat(tickets))
        setHiddenTickets([])
    }

    return(
        <div>        
            <input id="searchInput" placeholder='Search products' onChange={e => setSearch(e.target.value)}/>
            <button className="restoreHideTickets" onClick={restoreTickets}>restore</button>    
            <Ticket tickets={tickets} toHide={toHide} hiddenTickets={hiddenTickets} />
        </div>
    )
}

export default Main;