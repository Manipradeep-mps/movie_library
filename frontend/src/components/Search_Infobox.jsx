import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, useToast } from '@chakra-ui/react'
import '../styles/Infobox.css'
import { jwtDecode } from "jwt-decode";
import { Rating } from "primereact/rating";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { red } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import Header from './Header';


function Search_Infobox() {
    const toast=useToast()
    const navigate=useNavigate()
    const[data,setData]=useState([])
    const[isLoggged,setLogged]=useState(false)
    const searchReduxData=useSelector((state)=> state.search.results)
    const dataIndex=useSelector((state)=> state.search.dataIndex)

    useEffect(()=>{
        const token=localStorage.getItem('userInfo')
        if(token!=  undefined || token!=null)
        {
          setLogged(true)
        } 
        getinfo();
           
    },[])
  
    function getinfo(){
        const new_array=[]
        new_array.push(searchReduxData[dataIndex])
        setData(new_array)
        
    }

  function playlist(){
      navigate('/add-or-create-playlist/searchResult');
  }
    
  return (
    <>
    <Header/>
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

export default Search_Infobox
