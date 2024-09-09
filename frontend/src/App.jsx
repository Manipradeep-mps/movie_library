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
function App() {


  return (
    <>
       <Routes>
         <Route path='/' element={<Home/>}></Route>
         <Route path='/library' element={<Library/>}></Route>
         <Route path=':id/playlist' element={<Myplaylist/>}></Route>
         <Route path='/library/info/:type/:title' element={<Info/>}></Route>
         <Route path='/playlist/info/:id' element={<PlaylistInfo/>}></Route>
         <Route path='/add-or-create-playlist/:type/:title' element={<Addplaylist/>}></Route>
       </Routes>
    </>
  )
}


export default App
