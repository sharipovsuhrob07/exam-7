import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Spotify from '../components/Spotify'
import Home from './home/Home'
import PlaylistInfo from '../components/PlaylistInfo'
import Login from '../components/Login'
import YourLibrary from '../components/YourLibrary'

const RouteController = () => {
  return (
    <Routes>
        {/* <Route path='/' element={<Login />}/> */}
        <Route path='/' element={<Home/>} />
        <Route path='/playlist/:id' element={<PlaylistInfo/>} />
        <Route path='/yourlibrary' element={<YourLibrary />}/>
    </Routes>
  )
}

export default RouteController