import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import SearchBar from './SearchBar'
import Trending from './Trending'
import Webseries from './Webseries'
import { useNavigate } from 'react-router-dom'
import SearchComponent from './SearchComponent'


function Library() {

  const navigate=useNavigate()
   useEffect(()=>{
      checklogin();
   },[])

   async function checklogin(){
     if(localStorage.getItem("userInfo")==null ||localStorage.getItem("userInfo")==undefined)
     {
        navigate('/');
     }
   }


  return (
    <>
    <Header/>   
    <SearchBar/>   
    <Trending/>
    <Webseries/>

    </>
  )
}

export default Library
