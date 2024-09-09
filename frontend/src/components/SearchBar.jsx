import React, { useEffect } from 'react'
import '../styles/SearchBar.css'
import { Box, Button, Input,Tooltip} from '@chakra-ui/react'
import { useState } from 'react'
import TrendingCard from './TrendingCard'
import {CloseIcon} from '@chakra-ui/icons'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//import bg from 

function SearchBar() {

  const[isDisp,setDisp]=useState(false)
  const[searchtext,setSearchtext]=useState()
  const[resCount,setResCount]=useState()
  const[result_data,setResult_data]=useState([])
  const[struct_data,setStruct_data]=useState([])
  const[placeholder,setPlaceholder]=useState('')

  useEffect(()=>{
       structure_data();
  },[result_data])

  

  async function search(){
      const searchtxt=document.getElementById('search-text').value;
      setSearchtext(searchtxt)
      setPlaceholder('')
      const url = `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${searchtxt}.json`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'bb847ac30emsh40b8cc9406ebae9p18b7a5jsn56f3172a2ecb',
          'x-rapidapi-host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
        }
      };
      
      try {
        const response = await fetch(url, options);
        if(response.status==429)
        {
           toast.warn("Too many requests, Try again later !",{
            position:'top-right',
            autoClose:2000
           })
           return;
        }
        const result = await response.text();
        const data_json=JSON.parse(result)
        setResCount(data_json.d.length);
        setResult_data(data_json)
        setDisp(true)

      } catch (error) {
        toast.error("Something went wrong",{
          position:'top-right',
          autoClose:2000
         }) 
      }
  }

  async function structure_data() {
   
    const array=result_data.d;
    if (!Array.isArray(array)) return;
    const new_array=[];
    for(let ctr=0;ctr<array.length;ctr++)
    {
      let bigImage = array[ctr].i && array[ctr].i.imageUrl ? array[ctr].i.imageUrl : '/movie_images.jpeg';
        let obj={
          "rank":array[ctr].rank,
          "title":array[ctr].l,
          "year":array[ctr].y,
          "type":array[ctr].qid,
          "genre":[array[ctr].q],
          "big_image":bigImage,
          "actors":array[ctr].s
        }
        new_array.push(obj)
    }
    setStruct_data(new_array)
  }

  function close_search(){
       setDisp(false)
  }
  return (
    <>
    <ToastContainer/>
    <div className='image_container'>
       <img src='/Search_Bar_Background_Image_2.jpeg' className='bg'></img>
       <img src='/Search_Bar_Background_Image.jpeg' className='ov'></img>
       <div className='intro-text'> Welcome !! <br></br> Millions of Movies at your fingertips... <br></br><br></br>
           <Box bg={'white'} width='80%' borderRadius={30} display='flex' justifyContent='flex-end' height='40px'>
              <Input
                placeholder='Search for movies , web-series...'
                variant='unstyled'
                color='black'
                paddingLeft={4}
                id='search-text'
                value={placeholder}
                fontSize={['12px','13px','15px','18px']}
                onChange={(e) => setPlaceholder(e.target.value)}
              ></Input>
              <Button
               bgGradient="linear(to-r, rgba(30, 213, 169, 1) 0%, rgba(1, 180, 228, 1) 100%)"
               width='20%'
               height='40px'
               borderRadius={30} 
               display='flex'
               alignItems='center' 
              justifyContent='center'
               fontSize={['12px','13px','14px','15px']}
               _hover={{ bgGradient: "linear(to-r, rgba(30, 213, 169, 0.8) 0%, rgba(1, 180, 228, 0.8) 100%)" }} // Adjust hover gradient
               _focus={{ boxShadow: 'none' }} 
               onClick={search}
              >
                Search
                
              </Button>
           </Box>
       </div>
       

    </div>

    {
      isDisp && resCount>0 && result_data.length!=0 && (
    <>
    <div className='search_result-container'>
       <div className='result-text'>
          About {resCount} results for the search "{searchtext}"
       </div>
       <div className='search-close-icon'>
        <Tooltip label="Close  search results">
        <Button rightIcon={<CloseIcon color={'red'}/>} onClick={close_search} ></Button>
        </Tooltip>
       </div>

    </div>

    <div className='search-txt'>Search Results </div>
        <div className='searchres-container'>
        {
           struct_data.length!=0?(
           struct_data.map((data)=>{
              return <TrendingCard key={data.rank} data={data}/>
           })
           
           ):(
            <>
              Loading...
            </>
           )
           
           
        }
        </div>
        
    </>
      )
   }




    </>
  )
}

export default SearchBar
