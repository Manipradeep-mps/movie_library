import React from 'react'
import '../styles/PlaylistCard.css'
import { Link } from 'react-router-dom'
import { DeleteIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';

function PlaylistCard(props) {
    const data=props
    const listname=props.listname
    console.log(data)
    async function delete_item(){
        const userinfo=localStorage.getItem("userInfo");
        const user=jwtDecode(userinfo)
        const userid=user.id;
        const list=listname;
        const item_name=data.value.title;
    
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
          console.log(result)
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
        <div className='delete-icon'>
        <Button rightIcon={<DeleteIcon/>} onClick={delete_item}></Button>
        </div>
       
      </div>
      
      </div>
      
     
      
    </>
  )
}

export default PlaylistCard
