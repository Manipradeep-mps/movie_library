import React from 'react'
import '../styles/WebCard.css'
import { Link } from 'react-router-dom'
import { Image } from '@chakra-ui/react'

function WebCard(props) {
    let data=props.data

  return (
    <>
         <div className='w-individual'>
            <div className='w-image'>
            <Link to={`/library/info/webseries/${data.title}`}>
               <img src={`${data.big_image}`}></img>
               </Link>
            </div>
        </div>
    </>
  )
}

export default WebCard
