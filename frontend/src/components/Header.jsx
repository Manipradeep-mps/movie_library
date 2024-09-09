import React, { useEffect, useState } from 'react'
import '../styles/header.css'
import { Button ,Stack} from '@chakra-ui/react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { useBreakpointValue,Menu,MenuItem,MenuList,MenuButton ,IconButton} from '@chakra-ui/react';
import {HamburgerIcon} from '@chakra-ui/icons'

function Header() {
  const navigate=useNavigate()
  const isMobile = useBreakpointValue({ base: true, md: false });


  async function logout() {
    localStorage.removeItem("userInfo");
    navigate('/');
    
  }
  async function myplaylist(){
    const userdata=localStorage.getItem("userInfo")
     const user=await jwtDecode(userdata)
     const userid=user.id;
     navigate(`/${userid}/playlist`);
  }
  return (

    <div className='header'>
    {isMobile ? (
    
      <Menu>
        <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" color='white'/>
        <MenuList zIndex={1000}>
          <MenuItem as={Link} to='/library'>Explore</MenuItem>
          <MenuItem onClick={myplaylist}>Playlist</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    ) : (
      
      <Stack direction="row" gap={5} margin={2}>
        <Link to='/library'>
          <Button marginLeft={55} colorScheme="white">Explore</Button>
        </Link>
        <Button colorScheme="white" onClick={myplaylist}>Playlist</Button>
        <Button colorScheme="white" onClick={logout}>Logout</Button>
      </Stack>
    )}
  </div>
    
  )
}

export default Header
