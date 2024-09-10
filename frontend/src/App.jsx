import { useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './components/Home'
import Library from './components/Library'
import Info from './components/Info'
import Playlist from './components/Playlist'
import PlaylistInfo from './components/PlaylistInfo'
import Addplaylist from './components/Addplaylist'
import Myplaylist from './components/Myplaylist'
import Search_Infobox from './components/Search_Infobox'
import Search_Addplaylist from './components/Search_Addplaylist'
import Search_PlaylistInfo from './components/Search_PlaylistInfo'
function App() {


  return (
    <>
       <Routes>
         <Route path='/' element={<Home/>}></Route>
         <Route path='/library' element={<Library/>}></Route>
         <Route path=':id/playlist' element={<Myplaylist/>}></Route>
         <Route path='/library/info/:type/:title' element={<Info/>}></Route>
         <Route path='/library/info/searchResult' element={<Search_Infobox/>}></Route>
         <Route path='/playlist/info/:id' element={<PlaylistInfo/>}></Route>
         <Route path='/add-or-create-playlist/searchResult' element={<Search_Addplaylist/>}></Route>
         <Route path='/playlist/info/searchResult/:id' element={<Search_PlaylistInfo/>}></Route>
         <Route path='/add-or-create-playlist/:type/:title' element={<Addplaylist/>}></Route>
       </Routes>
    </>
  )
}


export default App
