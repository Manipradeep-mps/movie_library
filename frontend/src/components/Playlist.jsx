import React, { useEffect } from 'react'
import Header from './Header'
import Myplaylist from './Myplaylist'
import { useNavigate } from 'react-router-dom'

function Playlist() {
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
      <Myplaylist/>
      {/* <img src='https://leetcode.com/_next/static/images/null_light-53585615fd723ba992bd2df7a10d10d1.png' width={200}></img> */}
    </>
  )
}

export default Playlist
