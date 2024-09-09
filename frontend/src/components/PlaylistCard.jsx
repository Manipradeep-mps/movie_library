import React, { useEffect, useState } from 'react'
import '../styles/PlaylistCard.css'
import { Link } from 'react-router-dom'
import { DeleteIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import { useToast } from '@chakra-ui/react'

function PlaylistCard(props) {
    const toast=useToast()
    const data=props
    const listowner=props.listowner
    const listname=props.listname
    const onDelete=props.onDelete
    const[curruser,setuser]=useState() 

    useEffect(()=>{
       checkuser();
    },[])

    async function checkuser() {
      const userinfo=localStorage.getItem("userInfo");
      const user= await jwtDecode(userinfo)
      const userid=user.id;
      setuser(userid)
      // console.log(userid)
      // console.log(listowner)
    }

    async function delete_item(){

        const list=listname;
        const item_name=data.value.title;
        const userinfo=localStorage.getItem("userInfo");
        const user= await jwtDecode(userinfo)
        const userid=user.id;
        const obj={
          userid:userid,
          listname:list,
          item_name:item_name
        }
        await fetch(`${import.meta.env.VITE_BASE_URL}/list/delete-item`,{
          method:"POST",
          body:JSON.stringify(obj),
          headers:{
            'Content-Type':'Application/json'
          }
        })
        .then(res=>res.json())
        .then(result=>{
            if(result=="Success")
            {
               onDelete(data._id);
            }
        })
        
    
      }
  return (
    <>
    <div>
      <Link to={`/library/info/${data.value.type}/${data.value.title}`}>
      <div className='movie-image'>
        <img src='/movie_images.jpeg'></img>
      </div>
      </Link>
      <div className='movie-name'>
        {
             data.value.title

        }
        { curruser && ( 
            listowner == curruser ? (
            <>
              <div className='delete-icon'>
                  <Button rightIcon={<DeleteIcon/>} onClick={delete_item}></Button>
              </div>
            </>):
            (<></>)
         )
        }
       
      </div>
      
      </div>
      
     
      
    </>
  )
}

export default PlaylistCard
