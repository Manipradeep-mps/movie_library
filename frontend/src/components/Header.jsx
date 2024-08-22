import React from 'react'
import '../styles/header.css'
import { Button ,Stack} from '@chakra-ui/react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Header() {
  const navigate=useNavigate()
  async function logout() {
    localStorage.removeItem("userInfo");
    navigate('/');
    
  }
  return (
    <div className='header'>
       <Stack direction="row" gap={5} margin={2}>
          <Link to='/library'>
           <Button marginLeft={200}  colorScheme="white">Explore</Button>
           </Link>
           <Button  colorScheme="white">Playlist</Button>
           <Button  colorScheme="white"  onClick={logout}>Logout</Button>
    
       </Stack>
       
    </div>
  )
}

export default Header
