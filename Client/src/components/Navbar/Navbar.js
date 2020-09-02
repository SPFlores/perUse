import React, { useState, useEffect } from 'react'

const Navbar = _ => {
  const [navbarState, setNavbarState] = useState({
    isLoggedIn: false
  })

  useEffect(_ => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      setNavbarState({ ...navbarState, isLoggedIn: true })
    } else {
      setNavbarState({ ...navbarState, isLoggedIn: false })
    }
  }, [])

  return (
    <ul id='navBar'>
      <li class='navLILeft'><a class='navLink' href='/'>Home</a></li>
      <li class='navLILeft'><a class='navLink' href='/search'>Search</a></li>
      {navbarState.isLoggedIn
        ? <li class='navLIRight'><a class='navLink' href=''>Logout</a></li> : null}
      {navbarState.isLoggedIn
        ? null
        : <li class='navLIRight'><a class='navLink' href='/signup'>Signup</a></li>}
      {navbarState.isLoggedIn
        ? null
        : <li class='navLIRight'><a class='navLink' href='/login'>Login</a></li>}

    </ul>

  )
}

export default Navbar
