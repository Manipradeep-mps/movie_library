import React, { useEffect } from 'react'
import '../styles/TrendingCard.css'
import { Link } from 'react-router-dom'
import {setDataIndex} from '../slices/searchSlice'

function TrendingCard(props) {
    let data=props.data
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
