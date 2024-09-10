import { Button, position } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useParams } from 'react-router-dom'
import '../styles/Addplaylist.css'
import Header from './Header'
import PlaylistContainer from './PlaylistContainer'
import AddplaylistCard from './AddplaylistCard'
import { CloseIcon} from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import Search_AddplaylistCard from './Search_AddplaylistCard'


function Search_Addplaylist() {

  const[mylist,setlist]=useState([])
  const[isPop,setPop]=useState(false)
   const [data,setData]=useState([])
  const toast=useToast()

  const searchReduxData=useSelector((state)=> state.search.results)
  const dataIndex=useSelector((state)=> state.search.dataIndex)
   
  useEffect(()=>{
     getinfo();
     getplaylistinfo();
  },[])

  function getinfo(){
    const new_array=[]
    new_array.push(searchReduxData[dataIndex])
    setData(new_array)
}

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
        }
        else
        {
            setlist(result)
        }
      })
     }

    async function create_list(){
      const listname=document.getElementById('list-name').value
      if(listname=="" || listname==undefined || listname==null)
      {
        toast(
          {
             title:"Something went wrong",
             status:'error',
             position:'top-right',
             duration:2000,
             isClosable:true
          }
        )
          return;
      }
        
      setPop(false)
        
        const userinfo=localStorage.getItem("userInfo");
        const user= jwtDecode(userinfo)
        const userid=user.id;

        const obj={
          "listname":listname,
          "userid":userid,
          "listdata":[{
          "title":data[0].title,
          "type":type,
          "rank":data[0].rank,
          "image":data[0].big_image,
          "actors":String,
          "description":data[0].description,
          "genre":data[0].genre,
          "rating":data[0].rating,
          "year":data[0].year
          }]
        }
  
        try{
          await fetch(`${import.meta.env.VITE_BASE_URL}/list/create`,{
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
                   title:"List Created!",
                   status:'success',
                   position:'top-right',
                   duration:2000,
                   isClosable:true,
                   onCloseComplete:getplaylistinfo
                }
              )
              
                
             }
             else
             {
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
    function closelist(){
       setPop(false);
    }
    function listdis(){
      setPop(true);
    }
    
  return (
   <>
     <Header/>

     {
       isPop && (
       <>
       <div className='listname-container'>
          <div className='list-close'>
             <CloseIcon onClick={closelist}/>
          </div>
          
          <div className='list-header'>
            <p>Enter the ListName</p>
          </div> 
          <div className='list-input'>
           <input type='text' id='list-name'></input>
          </div> 
          <div className='list-button'>
           <Button onClick={create_list}>Submit</Button>
           </div>
       </div>
       </>)
     }
     <div className='create-header'> Create New Playlist</div>
     <div className='create-image' >
        <img src='/add_image1.jpeg' width={100} height={100}  className='c-image' onClick={listdis}></img>
     </div>
     <div className='ex-text'>
          Add to Existing Playlists
     </div>
     {
      
       mylist.length==0?(
        <>
          <div className='null-image'>
          <img src='https://leetcode.com/_next/static/images/null_light-53585615fd723ba992bd2df7a10d10d1.png' ></img>
          </div>
          <div className='no-text'>No lists found!</div>
        </>
     ):(
        <>
           
           <div className='aplaylist-container'>
            {
    
               mylist.map((data)=>{
                    return<Search_AddplaylistCard key={data._id} data={data}/>
               })
              
            }
                  
            </div>
        </>
     )
       }
    
   </>
  )
}

export default Search_Addplaylist
