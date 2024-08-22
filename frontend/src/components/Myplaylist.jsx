import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import '../styles/Myplaylist.css'
import PlaylistContainer from './PlaylistContainer';
function Myplaylist() {

    const[mylist,setlist]=useState([])

    useEffect(()=>{
        getplaylistinfo();
    },[])

    async function getplaylistinfo(){
        const userinfo=localStorage.getItem("userInfo");
        const user= await jwtDecode(userinfo)
        const userid=user.id;

        const obj={
            userid:userid
        }
       
        await fetch(`${import.meta.env.VITE_BASE_URL}/list/display`,{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
              'Content-Type':'Application/json'
            }
          })
          .then(res=>res.json())
          .then(result=>{
            if(result=="No list found")
            {
                setlist(null);
            }
            else
            {
                setlist(result)
            }
          })
    }

    return (
        <>
         {
     mylist==null ?(
        <>
          <div className='my-playlist'>
               My playlists
            </div>
          <div className='null-image'>
          <img src='https://leetcode.com/_next/static/images/null_light-53585615fd723ba992bd2df7a10d10d1.png'></img>
          </div>
          <div className='no-text'>No lists found!</div>
        </>
     ):(
        <>
            <div className='my-playlist'>
               My playlists
            </div>
           <div className='playlist-container'>
            {
               mylist.map((data)=>{
                   return <PlaylistContainer key={data._id} data={data}/>
               })
              
            }
                  
            </div>
        </>
     )
       }
        </>
    )
 
}

export default Myplaylist
