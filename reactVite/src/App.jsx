import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './comps/comps_user/home'
import { Header } from './comps/comps_static/header'

function App() {

  return (
 <BrowserRouter>
 <Header/>
 <Routes>
  <Route path='/' element={<Home/>}/>
 </Routes>
 </BrowserRouter>
  )
}

export default App
