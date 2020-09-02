import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const LandingPage = _ => {
  const [landingState, setLandingState] = useState({
    isLoggedIn: false
  })

  useEffect(_ => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      setLandingState({ ...landingState, isLoggedIn: true })
    } else {
      sessionStorage.setItem('isLoggedIn', false)
    }
  }, [])

  return (
    <div>
      <h1>perUse</h1>
      <p>Displays dummy text below about what the page is, what you can do.</p>
      {/* <ul>To Do
        <li>style everything</li>
      </ul> */}
      <div>
        <Link to='/search'>
          <button>Search</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
