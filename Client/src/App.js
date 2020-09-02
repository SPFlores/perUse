import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import LogIn from './pages/Login'
import SignUp from './pages/Signup'
import Search from './pages/Search'
import Navbar from './components/Navbar'
import Apply from './pages/Apply'
import './App.css'

const App = _ => {
  return (
    <Router>
      <Navbar />
      <Route exact path='/' render={_ => (<Landing />)} />
      <Route path='/login' render={_ => (<LogIn />)} />
      <Route path='/signup' render={_ => (<SignUp />)} />
      <Route path='/search' render={_ => (<Search />)} />
      <Route path='/apply' render={_ => (<Apply />)} />
    </Router>
  )
}

export default App
