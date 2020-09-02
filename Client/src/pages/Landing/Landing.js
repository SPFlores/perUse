import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const LandingPage = _ => {
  const [landingState, setLandingState] = useState({
    name: ''
  })

  useEffect(_ => {
    setLandingState({ ...landingState, name: sessionStorage.getItem('userName') })
  }, [])

  return (
    <div>
      <h1>perUse</h1>
      <p>Displays dummy text below about what the page is, what you can do.</p>
      {/* <ul>To Do
        <li>Navbar functionality</li>
        <li>style everything</li>
      </ul> */}
      <div>
        <Link to='/search'>
          <button>Search</button>
        </Link>
      </div>
      <div>
        <Link to='/login'>
          <button>Login</button>
        </Link>
        <Link to='/signup'>
          <button>Signup</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
