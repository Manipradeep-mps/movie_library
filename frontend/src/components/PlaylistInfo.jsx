import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/PlaylistInfo.css'
import PlaylistCard from './PlaylistCard'
import { useNavigate } from 'react-router-dom'

function PlaylistInfo() {
    const[data,setdata]=useState()
    const id=useParams()
    useEffect(()=>{
         getListInfo();
    },[])
    const navigate=useNavigate()
    useEffect(()=>{
       checklogin()
    },[])
    async function checklogin(){
      if(localStorage.getItem("userInfo")==null ||localStorage.getItem("userInfo")==undefined)
      {
         navigate('/');
      }
    }

    async function getListInfo() {
     
        const obj={
            id:id.id
        }
        await fetch(`${import.meta.env.VITE_BASE_URL}/list/getlistinfo`,{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
              'Content-Type':'Application/json'
            }
          })
          .then(res=>res.json())
          .then(result=>{
            setdata(result)
          })
    }
    return (
    <>
     {
        data==undefined ? (
            <>
             Loading....
            </>
        ):(
        <>
         {
            <>
            <div className='listname'>
              {data.listname}
            </div>
            <div className='listdata-container'>
               {
                  data.listdata.map((val)=>{
                    return <PlaylistCard key={val.id} value={val} listname={data.listname}/>
                  })
               }
            </div>
            </>
            
         }

        </>
         )
     }
     
    </>
  )
}

export default PlaylistInfo
