import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = _ => {
  return (
    <div>
      <h1>perUse</h1>
      <h4>Welcome, NAME</h4>
      <p>Displays dummy text below about what the page is, what you can do.</p>
      <p>Offers buttons to sign up or login (Router).</p>
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
