import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/PlaylistInfo.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import { jwtDecode } from 'jwt-decode'
import {ExternalLinkIcon} from "@chakra-ui/icons"
import { Tooltip } from '@chakra-ui/react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useToast } from '@chakra-ui/react'
import Search_PlaylistCard from './Search_PlaylistCard'

function Search_PlaylistInfo() {
    const[data,setdata]=useState([])
    const[isShared,setShared]=useState(false)
    const id=useParams()
    const[curruser,setuser]=useState()
    const toast=useToast()

    useEffect(()=>{
         getListInfo();
         checkuser()
    },[])

    const navigate=useNavigate()

    useEffect(()=>{
       checklogin()
    },[])
    
    async function checkuser(){
      const userinfo=localStorage.getItem("userInfo");
      const user= await jwtDecode(userinfo)
      const userid=user.id;
      setuser(userid)
    }
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
    function handleDelete(id){
      //console.log(data)
    }
    function handleshare(){
      const url=window.location.href;
      navigator.clipboard.writeText(url).then(()=>{
        toast({
          title:"Link Copied To Clipboard",
          position:'top-right',
          duration:2000,
          status:'success'
        })
      })
      .catch(()=>{
        toast({
          title:"Failed to Copy to Clipboard",
          position:'top-right',
          duration:2000,
          status:'error'
        })
      })
    }
    return (
    <>
    <Header/>
     {
        data.length==0 ? (
            <>
             Loading....
            </>
        ):(
        <>
         {
            <>
            <div className='listname'>
              {data.listname}
              
              <Tooltip label='Share as Link'>
                <ExternalLinkIcon color={'blue'} marginLeft='20px' onClick={handleshare} cursor='pointer'/>
              </Tooltip>
             
            </div>
            <div className='listdata-container'>
               {
                  data.listdata.map((val)=>{
                    return <Search_PlaylistCard key={val.id} value={val} listname={data.listname} onDelete={handleDelete} listowner={data.userid}/>
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

export default Search_PlaylistInfo
