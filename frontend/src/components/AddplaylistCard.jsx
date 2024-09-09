import React from 'react'
import '../styles/AddplaylistCard.css'
import { Link ,useParams} from 'react-router-dom'
import {  AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import {  Button, Stack,Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useToast } from '@chakra-ui/react'


function AddplaylistCard(props) {
    const[data,setData]=useState([])
    const [isHovered, setIsHovered] = useState(false);
    let info=props.data
    const toast=useToast()
    const {title}=useParams()
    const {type}=useParams()
     useEffect(()=>{
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
          toast(
            {
               title:"Something went wrong",
               status:'error',
               position:'top-right',
               duration:2000,
               isClosable:true
            }
          )
        }
    }
    async function addlist(){
        const userinfo=localStorage.getItem("userInfo");
          const user= await jwtDecode(userinfo)
          const userid=user.id;
          const title=info.listname;
          const obj={
            "id":userid,
            "listname":title,
            "listdata":{
              "title":data[0].title,
              "type":type,
              "rank":data[0].rank,
              "image":data[0].big_image,
              "actors":String,
              "description":data[0].description,
              "genre":data[0].genre,
              "rating":data[0].rating,
              "year":data[0].year
              }
          }
          try{
            await fetch(`${import.meta.env.VITE_BASE_URL}/list/add`,{
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
                toast(
                  {
                     title:"Added to List!",
                     status:'success',
                     position:'top-right',
                     duration:2000,
                     isClosable:true
                  }
                )
              }
              else if(result=="Item Already Exists in the list")
              {
                toast(
                  {
                     title:"Item Already Exists in the list",
                     status:'error',
                     position:'top-right',
                     duration:2000,
                     isClosable:true
                  }
                )
              }
              else if(result=="Error")
              {
                toast(
                  {
                     title:"Failed to add",
                     status:'error',
                     position:'top-right',
                     duration:2000,
                     isClosable:true
                  }
                )
              }

            })
    
          }
          catch(err){
            toast(
              {
                 title:"Failed to Add",
                 status:'error',
                 position:'top-right',
                 duration:2000,
                 isClosable:true
              }
            )
          }
    
      }
    return (
      <>
    
      { data.length>0 ? (<> <div>
          <Link to={`/playlist/info/${info._id}`}>
          <div className='list-image'>
          <img src='/Playlist_image.jpeg'></img>
          </div>
          </Link>
        <div className='list-menu'>
            <div className='list-text'>
             {
              info.listname
             }
            </div>
            <div className='add-button'
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
            >
              <Button rightIcon={<AddIcon/>} onClick={addlist} size='sm'></Button>
            </div>
        </div>
        {
            isHovered && (
                <div className='hide'>
                    Add to this list!
                </div>
            )
        }
        
          
          
          
        </div></>):
        (<>
          <p>Loading...</p>
        </>)}
      </>
    )
}

export default AddplaylistCard
