import { Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'

function Addplaylist() {
    async function create_list(){
        const userinfo=localStorage.getItem("userInfo");
        const user= jwtDecode(userinfo)
        const userid=user.id;
        const obj={
          "listname":"Newlist1",
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
            console.log(result)
          })
  
        }
        catch(err){
           console.log(err)
        }
        
       
      
    }
    
  return (
   <>
     Create new Playlist
     <input type='text' id='list-name'></input>
     <Button onClick={create_list}>Create</Button>
   </>
  )
}

export default Addplaylist
