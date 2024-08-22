import React, { useEffect } from 'react'
import '../styles/TrendingCard.css'
import { Link } from 'react-router-dom'

function TrendingCard(props) {
    let data=props.data
    useEffect(()=>{
    
    },[])

  return (
    <>
        <div className='movie-individual'>
            <div className='movie-image'>
              <Link to={`/library/info/movie/${data.title}`}>
               <img src={`${data.big_image}`}></img>
               </Link>
            </div>
        </div>
    </>
  )
}

export default TrendingCard
