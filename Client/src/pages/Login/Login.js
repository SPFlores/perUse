import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const LoginPage = _ => {
  const username = useRef()
  const password = useRef()

  const [userState, setUserState] = useState({
    isLoggedIn: false,
    failedLoginUsername: false,
    failedLoginPassword: false
  })

  userState.renderRedirect = _ => {
    if (userState.isLoggedIn) {
      return <Redirect to='/' />
    }
  }

  userState.handleLogInUser = e => {
    e.preventDefault()
    if (username.current.value === '' && password.current.value === '') {
      console.log('major yar at your service captain sarcasm')
      setUserState({
        ...userState,
        failedLoginUsername: true,
        failedLoginPassword: true
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (username.current.value === '') {
      console.log('big bad user yar')
      setUserState({
        ...userState,
        failedLoginUsername: true,
        failedLoginPassword: false
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (password.current.value === '') {
      console.log('big bad password yar')
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
        .then(_ => {
          console.log('user is signed in')
          sessionStorage.setItem('isLoggedIn', true)
          setUserState({ ...userState, isLoggedIn: true })
        })
        .catch(e => console.log(e))
    }
  }

  return (
    <div>
      {userState.isLoggedIn ? userState.renderRedirect() : null}

      <p>This is the login page</p>      <li>Text about logging in</li>
      <form>
        <h5>Login To Your Account</h5>
        <div>
          {userState.failedLoginUsername ? console.log('username alert') : null}
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' ref={username} />
        </div>
        <div>
          {userState.failedLoginPassword ? console.log('password alert') : null}
          <label htmlFor='password'>Password</label>
          <input type='text' id='password' name='password' ref={password} />
        </div>
        {/* checkbox for "remember me" that sets local storage */}
        {/* <div>
          <input type='checkbox' name='rememberMe' id='rememberMe' ref={rememberMe} />
          <label htmlFor='rememberMe'>Remember Me</label>
        </div> */}
        <button onClick={userState.handleLogInUser}>Submit</button>
      </form>
    </div>
  )
}

export default LoginPage
