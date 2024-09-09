import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, useToast } from '@chakra-ui/react'
import '../styles/Infobox.css'
import { jwtDecode } from "jwt-decode";
import { Rating } from "primereact/rating";
import BookmarksIcon from '@mui/icons-material/Bookmarks';

function Infobox() {
    const toast=useToast()
    const {title}=useParams()
    const {type}=useParams()
     
    const navigate=useNavigate()
    const[data,setData]=useState([])
    const[isLoggged,setLogged]=useState(false)
    useEffect(()=>{
        const token=localStorage.getItem('userInfo')
        if(token!=  undefined || token!=null)
        {
          setLogged(true)
        }
        getinfo();
    },[])

    async function getinfo(){
        try
        {
             await fetch(`${import.meta.env.VITE_BASE_URL}/info/search`,{
                method:'POST',
                body:JSON.stringify({
                   title:title,
                   type:type
                }),
                headers:{
                    'Content-Type':'Application/json'
                }
             })
             .then(res=>res.json())
             .then(result=>{
                 setData(result)
             })
        }
        catch(err){
          toast({
            title:'Someting went wrong! Try again later',
            status:"error",
            position:"top-right",
            duration:3000,
            isClosable:true

          })
        }
    }
    async function getlist(){
      const userinfo=localStorage.getItem("userInfo");
      const user=jwtDecode(userinfo)
      
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
        console.log(result)
      })

      

    }
 

  async function delete_item(){
    const userinfo=localStorage.getItem("userInfo");
    const user=jwtDecode(userinfo)
    const userid=user.id;
    const listname="Newlist2";
    const item_name=title;

    const obj={
      userid:userid,
      listname:listname,
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

  async function delete_list() {
    const userinfo=localStorage.getItem("userInfo");
    const user=jwtDecode(userinfo)
    const userid=user.id;
    const listname="Newlist2";
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
      console.log(result)
    })

    
  }

  function playlist(){
    navigate(`/add-or-create-playlist/${type}/${title}`);
  }
    
  return (
    <>
      {
        data.length >0 ?(
          <div className='info-container'>
               <div className='info-image'>
                  <img src={`${data[0].big_image}`} alt='Image Loading'></img>
               </div>
               <div className='info-description'>
                   <div className='info-title'>
                      {`${data[0].title}`}
                   </div>
                   <div className='info-genre'>
                      Genre : {`${data[0].genre} `}
                   </div>
                   <div className='info-des'>
                       {`${data[0].description}`}
                   </div>
                   <div className='info-rating'>
                     Rating :
                    {
                      data[0].rating !== null && data[0].rating !== undefined && (
                        <Rating value={data[0].rating/2} readOnly cancel={false} style={{ color: 'yellow'}} className='star'/>
                      )
                    }
                   </div>
                   <div className='list-icon'>
                    { isLoggged==true ? (
                      <Button onClick={playlist} rightIcon={<BookmarksIcon fontSize='large'/>}>Playlist</Button>):(
                       <>
                       <div className='noclick'>
                          <div className='n-button'>
                          <Button  rightIcon={<BookmarksIcon fontSize='large'/>}>Playlist</Button>
                          </div>
                          <div className='n-text'>Login to use this feature !!</div>
                       </div>
                       </>
                    )
                    }
                   </div>
                  
                   
               </div>
          </div>
        ):(

          <p>Loading...</p>
        )
      }
    </>
  )
}

export default Infobox
