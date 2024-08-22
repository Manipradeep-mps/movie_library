import React, { useEffect, useState } from 'react'
import { Box ,Text} from '@chakra-ui/react'
import '../styles/Trending.css'
import TrendingCard from './TrendingCard'

function Trending() {
  const [Trending_movies,setTrending_movies]=useState([])
   useEffect(()=>{
      gettrending();
   },[])

  async function gettrending(){
       await fetch(`${import.meta.env.VITE_BASE_URL}/info/trending`,{
         method:"GET",
         headers:{
           'Content-Type':'Application/json'
         }
       })
       .then(resp=> resp.json())
       .then(res=>{
          setTrending_movies(res)
       })
       
       
  }

 
  return (
    <>
      {/* <Box

         marginLeft={10}
         marginTop={10}
         borderRadius={30}
         bg='rgb(7, 31, 103)'
         width='12%'
         height='25px'
        >
            <Box
              bgGradient='linear(to-r, rgba(29, 213, 169, 1) 0%, rgba(1, 180, 228, 1) 100%)'
              bgClip='text'
              color="transparent"
              paddingLeft={2}
              >
                Trending Movies
                
            </Box>
         
        </Box> */}
        <div className='trending'>Trending Movies</div>
        <div className='movie-container'>
        {
          
           Trending_movies.map((data)=>{
              return <TrendingCard key={data.rank} data={data}/>
           })
           
        }
        </div>

    </>
  )
}

export default Trending
