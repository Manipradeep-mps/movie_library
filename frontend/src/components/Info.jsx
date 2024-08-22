import React from 'react'
import Header from './Header'
import Infobox from './Infobox'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Info() {
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
  return (
    <>
      <Header/>
      <Infobox/>
    </>
  )
}

export default Info
