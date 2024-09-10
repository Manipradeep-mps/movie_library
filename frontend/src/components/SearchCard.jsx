import React, { useEffect } from 'react'
import '../styles/TrendingCard.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {setDataIndex} from '../slices/searchSlice'

function SearchCard(props) {
    const dispatch=useDispatch()
    let data=props.data
    let ind=props.ind
  function indexData(){
     dispatch(setDataIndex(ind))
  }
  return (
    <>
        <div className='movie-individual'>
            <div className='movie-image'>
              <Link to={`/library/info/searchResult`}>
               <img src={`${data.big_image}`} onClick={indexData}></img>
               </Link>
            </div>
        </div>
    </>
  )
}

export default SearchCard
