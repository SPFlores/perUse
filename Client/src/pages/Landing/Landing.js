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
    <div class='mainArea'>
      <h1 id='mainTitle'>perUse</h1>
      <p id='landingText'>Welcome to perUse, the job site for U! Take a look at the jobs we host to see if any of them could be your next best fit! Be sure to sign in (or sign up) to get access to all of our functionality. Happy perUsing!</p>
      <div>
        <Link to='/search'>
          <button class='blockButton' id='searchingButton'>Search</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
