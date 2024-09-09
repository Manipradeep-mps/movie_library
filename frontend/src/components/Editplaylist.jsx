import React from 'react'
import '../styles/Editplaylist.css'
import { Link } from 'react-router-dom'
import {  DeleteIcon } from '@chakra-ui/icons'
import { jwtDecode } from 'jwt-decode'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'


function Editplaylist({data,onDelete}) {
    // we can get prpos like  this
    // let data=props.data
    // const onDelete = props.onDelete;
    
    
    async function  delete_list(){
    const userinfo=localStorage.getItem("userInfo");
    const user=await jwtDecode(userinfo)
    const userid=user.id;
    const listname=data.listname;
    const obj={
      userid:userid,
      listname:listname
    }
    await fetch(`${import.meta.env.VITE_BASE_URL}/list/delete-list`,{
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
      else
      {

        toast.warn("Deletion failed",{
            position:'top-right',
            autoClose:1000
        })
      }
    })

    }

    return (
      <>
      <ToastContainer/>
      <div>
        <div>
          <Link to={`/playlist/info/${data._id}`}>
          <div className='eplaylist-image'>
          <img src='/Playlist_image.jpeg'></img>
          </div>
          </Link>
        </div>
        
        <div className='eplaylist-text'>
             {
              data.listname
             }
             <div className='edelete-icon'>
                <DeleteIcon onClick={delete_list} cursor='pointer'/>
            </div> 
        </div>
    </div>
          
        
        
      </>
    )
}

export default Editplaylist
