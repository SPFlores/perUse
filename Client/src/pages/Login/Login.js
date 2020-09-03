import React, { useState, useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const LoginPage = _ => {
  const username = useRef()
  const password = useRef()

  const [userState, setUserState] = useState({
    isLoggedIn: false,
    failedLoginUsername: false,
    failedLoginPassword: false,
    token: ''
  })

  userState.renderRedirect = _ => {
    if (userState.token.length > 0) {
      return <Redirect to='/' />
    }
  }

  userState.handleLogInUser = e => {
    e.preventDefault()
    if (username.current.value === '' && password.current.value === '') {
      // console.log('major yar at your service captain sarcasm')
      setUserState({
        ...userState,
        failedLoginUsername: true,
        failedLoginPassword: true
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (username.current.value === '') {
      // console.log('big bad user yar')
      setUserState({
        ...userState,
        failedLoginUsername: true,
        failedLoginPassword: false
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (password.current.value === '') {
      // console.log('big bad password yar')
      setUserState({
        ...userState,
        failedLoginUsername: false,
        failedLoginPassword: true
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else {
      axios.post('/login', {
        username: username.current.value,
        password: password.current.value
      })
        .then(({ data }) => {
          if (data.token) {
            sessionStorage.setItem('isLoggedIn', true)
            sessionStorage.setItem('token', data.token)
            setUserState({ ...userState, token: data.token, isLoggedIn: true })
          }
        })
        .catch(_ => {
          setUserState({ ...userState, isLoggedIn: false })
        })
    }
  }

  return (
    <div>
      {userState.isLoggedIn ? userState.renderRedirect() : null}

      <div>
        <p>Log in to get the most out of perUse!</p>
      </div>

      <form>
        <h5>Login To Your Account</h5>
        <div>
          {userState.failedLoginUsername ? <p style={{ color: 'red' }}>Please enter your username!</p> : null}
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' ref={username} />
        </div>
        <div>
          {userState.failedLoginPassword ? <p style={{ color: 'red' }}>Please enter your password!</p> : null}
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' ref={password} />
        </div>
        {/* checkbox for "remember me" that sets local storage */}
        {/* <div>
          <input type='checkbox' name='rememberMe' id='rememberMe' ref={rememberMe} />
          <label htmlFor='rememberMe'>Remember Me</label>
        </div> */}
        <button onClick={userState.handleLogInUser}>Submit</button>
      </form>

      <h5>Don't have an account? No problem!</h5>
      <Link to='/signup'>
        <button>Sign Up</button>
      </Link>
    </div>
  )
}

export default LoginPage
