import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = _ => {
  return (
    <div>
      <h1>perUse</h1>
      {/* <h4>Welcome, NAME</h4> */}
      <p>Displays dummy text below about what the page is, what you can do.</p>
      {/* <ul>To Do
        <li>Validate user after login/signup and store token and name in session storage</li>
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
