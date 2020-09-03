import React, { useState, useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const SignupPage = _ => {
  const name = useRef()
  const username = useRef()
  const password = useRef()
  const passwordConf = useRef()

  const [newUserState, setNewUserState] = useState({
    isLoggedIn: false,
    failedAll: false,
    failedSignupName: false,
    failedSignupUsername: false,
    failedSignupPassword: false,
    failedConfirmPassword: false
  })

  newUserState.renderRedirect = _ => {
    if (newUserState.isLoggedIn) {
      return <Redirect to='/' />
    }
  }

  newUserState.handleSignUpUser = e => {
    e.preventDefault()
    if (name.current.value === '' && username.current.value === '' && password.current.value === '') {
      setNewUserState({
        ...newUserState,
        failedAll: true
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (name.current.value === '') {
      console.log('big bad name yar')
      setNewUserState({
        ...newUserState,
        failedAll: false,
        failedSignupName: true,
        failedSignupUsername: false,
        failedSignupPassword: false,
        failedConfirmPassword: false
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (username.current.value === '') {
      console.log('big bad user yar')
      setNewUserState({
        ...newUserState,
        failedAll: false,
        failedSigupName: false,
        failedSignupUsername: true,
        failedSignupPassword: false,
        failedConfirmPassword: false
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (password.current.value === '') {
      console.log('big bad password yar')
      setNewUserState({
        ...newUserState,
        failedAll: false,
        failedSignupnName: false,
        failedSignupUsername: false,
        failedSignupPassword: true,
        failedConfirmPassword: false
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (password.current.value !== passwordConf.current.value) {
      console.log('passwords dont match')
      setNewUserState({
        ...newUserState,
        failedAll: false,
        failedSignupnName: false,
        failedSignupUsername: false,
        failedSignupPassword: false,
        failedConfirmPassword: true
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else {
      console.log('axios post /register call')
      axios.post('/register', {
        username: username.current.value,
        password: password.current.value,
        name: name.current.value
      })
        .then(_ => {
          axios.post('/login', {
            username: username.current.value,
            password: password.current.value
          })
            .then(({ data }) => {
              sessionStorage.setItem('isLoggedIn', true)
              sessionStorage.setItem('token', data.token)
              setNewUserState({ ...newUserState, isLoggedIn: true })
            })
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
    }
  }

  return (
    <div class='mainArea'>
      {newUserState.isLoggedIn ? newUserState.renderRedirect() : null}

      <div>
        <h4 class='userPlease'>Sign up to get the most out of perUse!</h4>
      </div>

      <form>
        <h5>Sign Up For An Account</h5>
        <div>
          {newUserState.failedAll ? <p style={{ color: '#ef6461' }}>Please enter your information!</p> : null}
          {newUserState.failedSignupName ? <p style={{ color: '#ef6461' }}>Please enter your name!</p> : null}
          <label htmlFor='name'>Name: </label>
          <input type='text' id='name' name='name' ref={name} id='nameEntry'/>
        </div>
        <div>
          {newUserState.failedSignupUsername ? <p style={{ color: '#ef6461' }}>Please enter your username!</p> : null}
          <label htmlFor='username'>Username: </label>
          <input type='text' id='username' name='username' ref={username} class='usernameEntry' />
        </div>
        <div>
          {newUserState.failedSignupPassword ? <p style={{ color: '#ef6461' }}>Please enter a password!</p> : null}
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' ref={password} class='passwordEntry' />
        </div>
        <div>
          {newUserState.failedConfirmPassword ? <p style={{ color: 'red' }}>Your passwords do not match!</p> : null}
          <label htmlFor='passwordConf'>Password</label>
          <input type='password' id='passwordConf' name='passwordConf' ref={passwordConf} class='passwordEntry' />
        </div>
        <button onClick={newUserState.handleSignUpUser} class='signupBtn'>Submit</button>
      </form>

      <h5>Already have an account? No problem!</h5>
      <Link to='/login'>
        <button class='signupBtn'>Login</button>
      </Link>
    </div>
  )
}

export default SignupPage
