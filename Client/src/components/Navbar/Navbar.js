import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const Navbar = _ => {
  const [navbarState, setNavbarState] = useState({
    isLoggedIn: false,
    loggedOut: true
  })

  useEffect(_ => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      setNavbarState({ ...navbarState, isLoggedIn: true, loggedOut: false })
      console.log('set to true')
    } else {
      setNavbarState({ ...navbarState, isLoggedIn: false, loggedOut: true })
      console.log('set to false')
    }
  }, [])

  navbarState.handleLogout = e => {
    console.log('you have logged out')
    setNavbarState({ ...navbarState, isLoggedIn: false })
    sessionStorage.setItem('isLoggedIn', 'false')
    sessionStorage.setItem('token', '')
  }

  return (
    <ul id='navBar'>
      <li class='navLILeft'><a class='navLink' href='/'>Home</a></li>
      <li class='navLILeft'><a class='navLink' href='/search'>Search</a></li>
      {navbarState.isLoggedIn
        ? <li class='navLIRight'><a class='navLink' href='/' onClick={navbarState.handleLogout}>Logout</a></li> : null}
      {navbarState.loggedOut
        ? <li class='navLIRight'><a class='navLink' href='/signup'>Signup</a></li>
        : null
      }
      {navbarState.loggedOut
        ? <li class='navLIRight'><a class='navLink' href='/login'>Login</a></li>
        : null
      }
    </ul>
  )
}

export default Navbar
