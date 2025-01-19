import { useState } from 'react'
import React from 'react';
import  NavBar  from './components/NavBar'
import Home from './pages/Home'
import Footer from './components/Footer'
import './App.css'
import Course from './pages/Course'
import Register from './components/Register'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <NavBar></NavBar>
          <Routes>
           <Route path='/' element = {<Home></Home>} />
           <Route path='/Course' element = {<Course/>} />
           <Route path='/Register' element={<Register/>}></Route>
          </Routes>

          <Footer></Footer>
    </>
  )
}

export default App
