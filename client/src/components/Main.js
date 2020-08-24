import React, { useEffect, useState } from 'react';
import Ticket from './Ticket'
import axios from 'axios';

function Main(){
    const[tickets,setTickets]= useState([])
    const[search, setSearch]=useState('full')

    useEffect(async()=>{
        try{
            const response = await axios.get(`/api/tickets/?searchText=${search}`)
            setTickets(response.data)
        } catch(error){
            console.error(error)
        }
    },[search])

    return(
        <div>        
            <input id="searchInput" placeholder='Search products' onChange={e => setSearch(e.target.value)}/>
            <Ticket tickets={tickets}/>
        </div>
    )
}

export default Main;