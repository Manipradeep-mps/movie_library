import React, { useEffect, useState } from 'react'
import '../styles/Webseries.css'
import WebCard from './WebCard';

function Webseries() {

    const [Webseries, setWebseries]=useState([])

    useEffect(()=>{
        getWebseries();

    },[])

    async function getWebseries(){
        await fetch(`${import.meta.env.VITE_BASE_URL}/info/webseries`,{
            method:"GET",
            headers:{
              'Content-Type':'Application/json'
            }
          })
          .then(resp=> resp.json())
          .then(res=>{
              setWebseries(res)
          })

    }

  return (
    <>
     <div className='webseries'>Trending Web Series</div>
        <div className='web-series-container'>
        {
          
           Webseries.map((data)=>{
              return <WebCard key={data.rank} data={data}/>
           })
           
        }
        </div>
    </>
  )
}

export default Webseries
