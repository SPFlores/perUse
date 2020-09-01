import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './pages/landing'
import './App.css'

const App = _ => {
  return (
    // <Router>
    //   <Route exact path='/' render={_=> (<Landing />)} />
    //   <Route path='/login' render={_ => (<LogIn />)} />
    //   <Route path='/signup' render={_ => (<SignUp />)} />
    //   <Route path='/search' render={_ => (<Search />)} />
    // </Router>
    <div>
      <p>Here is some text to show it's working </p>
    </div>
  )
}

export default App
