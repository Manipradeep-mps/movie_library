import React from 'react'
import '../styles/SearchBar.css'
import { Box, Button, Input } from '@chakra-ui/react'
//import bg from 

function SearchBar() {
  return (
    <>
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
              ></Input>
              <Button
               bgGradient="linear(to-r, rgba(30, 213, 169, 1) 0%, rgba(1, 180, 228, 1) 100%)"
               width='20%'
               height='40px'
               borderRadius={30} 
               display='flex'
               alignItems='center' 
              justifyContent='center'
               fontSize={15}
               _hover={{ bgGradient: "linear(to-r, rgba(30, 213, 169, 0.8) 0%, rgba(1, 180, 228, 0.8) 100%)" }} // Adjust hover gradient
               _focus={{ boxShadow: 'none' }} 
              >
                Search
                
              </Button>
           </Box>
       </div>
       

    </div>




    </>
  )
}

export default SearchBar
