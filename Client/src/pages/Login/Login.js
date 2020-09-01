import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const LoginPage = _ => {
  const username = useRef()
  const password = useRef()

  const [userState, setUserState] = useState({
    isLoggedIn: false,
    failedLogin: false,
    user: ''
  })

  userState.renderRedirect = _ => {
    if (userState.isLoggedIn) {
      return <Redirect to='/' />
    }
  }

  userState.handleLogInUser = e => {
    e.preventDefault()
    if (username.current.value === '' || password.current.value === '') {
      setUserState({ ...userState, failedLogin: true })
    } else {
      axios.post('/login', {
        username: username.current.value,
        password: password.current.value
      })
        .then(_ => {
          console.log('user is signed in')
          setUserState({ ...userState, isLoggedIn: true })
        })
        .catch(e => console.log(e))
    }
  }

  userState.testing = e => {
    e.preventDefault()
    console.log(username.current.value)
    console.log(password.current.value)
    console.log(rememberMe.current.checked)
  }

  return (
    <div>
      {userState.isLoggedIn ? userState.renderRedirect() : console.log(username)}

      <p>This is the login page</p>      <li>Text about logging in</li>
      <form>
        <h5>Login To Your Account</h5>
        {/* <li>box for email</li> */}
        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' ref={username} />
        </div>
        {/* <li>box for password</li> */}
        <div><label htmlFor='password'>Password</label>
          <input type='text' id='password' name='password' ref={password} />
        </div>
        {/* <li>checkbox for "remember me" that sets local storage</li> */}
        <div>
          <input type='checkbox' name='rememberMe' id='rememberMe' ref={rememberMe} />
          <label htmlFor='rememberMe'>Remember Me</label>
        </div>
        {/* <li>submit button that validates both fields filled, validates correct login</li> */}
        <button onClick={userState.handleLogInUser}>Submit</button>
      </form>
    </div>
  )
}

export default LoginPage
