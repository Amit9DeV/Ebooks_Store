import { useState } from 'react'
import React, { lazy } from 'react';
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import RouteWrapper from './components/RouteWrapper'

// Lazy load components
const Home = lazy(() => import('./pages/Home'))
const Course = lazy(() => import('./pages/Course'))
const Contact = lazy(() => import('./pages/Contact'))
const About = lazy(() => import('./pages/About'))
const Register = lazy(() => import('./components/Register'))

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<RouteWrapper component={Home} />} />
        <Route path='/Course' element={<RouteWrapper component={Course} />} />
        <Route path='/Contact' element={<RouteWrapper component={Contact} />} />
        <Route path='/About' element={<RouteWrapper component={About} />} />
        <Route path='/Register' element={<RouteWrapper component={Register} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
