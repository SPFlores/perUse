import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const Navbar = _ => {
  const [navbarState, setNavbarState] = useState({
    isLoggedIn: false,
    loggedOut: true
  })

  useEffect(_ => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      setNavbarState({ ...navbarState, isLoggedIn: true })
    }
  }, [])

  navbarState.handleLogout = e => {
    // e.preventDefault()
    console.log('you have logged out')
    // setNavbarState({ ...navbarState, isLoggedIn: false })
    sessionStorage.setItem('isLoggedIn', 'false')
    sessionStorage.setItem('token', '')
  }

  return (
    <ul id='navBar'>
      <li class='navLILeft'><a class='navLink' href='/'>Home</a></li>
      <li class='navLILeft'><a class='navLink' href='/search'>Search</a></li>
      {sessionStorage.getItem('isLoggedIn') === 'true'
        ? <li class='navLIRight'><a class='navLink' href='/' onClick={navbarState.handleLogout}>Logout</a></li> : null}
      {sessionStorage.getItem('isLoggedIn') === 'false' || null
        ? <li class='navLIRight'><a class='navLink' href='/signup'>Signup</a></li>
        : null}
      {sessionStorage.getItem('isLoggedIn') === 'false' || null
        ? <li class='navLIRight'><a class='navLink' href='/login'>Login</a></li>
        : null}
    </ul>
  )
}

export default Navbar
