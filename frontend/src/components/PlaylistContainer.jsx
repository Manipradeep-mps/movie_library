import React from 'react'
import '../styles/PlaylistContainer.css'
import { Link } from 'react-router-dom'

function PlaylistContainer(props) {
    let data=props.data
  return (
    <>
      <div>
        <Link to={`/playlist/info/${data._id}`}>
        <div className='playlist-image'>
        <img src='/Playlist_image.jpeg'></img>
        </div>
        <div className='playlist-text'>
           {
            data.listname
           }
        </div>
        </Link>
      </div>
    </>
  )
}

export default PlaylistContainer
