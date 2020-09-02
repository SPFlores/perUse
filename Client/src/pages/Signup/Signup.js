import React, { useState, useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const SignupPage = _ => {

  const name = useRef()
  const username = useRef()
  const password = useRef()

  const [newUserState, setNewUserState] = useState({
    isLoggedIn: false,
    failedAll: false,
    failedSignupName: false,
    failedSignupUsername: false,
    failedSignupPassword: false
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
        failedSignupPassword: false
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (username.current.value === '') {
      console.log('big bad user yar')
      setNewUserState({
        ...newUserState,
        failedAll: false,
        failedSigupName: false,
        failedSignupUsername: true,
        failedSignupPassword: false
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (password.current.value === '') {
      console.log('big bad password yar')
      setNewUserState({
        ...newUserState,
        failedAll: false,
        failedSignupnName: false,
        failedSignupUsername: false,
        failedSignupPassword: true
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else {
      axios.post('/signup', {
        username: username.current.value,
        password: password.current.value,
        name: name.current.vlue
      })
        .then(_ => {
          console.log('user is signed up')
          sessionStorage.setItem('isLoggedIn', true)
          setNewUserState({ ...newUserState, isLoggedIn: true })
        })
        .catch(e => console.log(e))
    }
  }

  return (
    <div>
      {newUserState.isLoggedIn ? newUserState.renderRedirect() : null}

      <div>
        <p>Sign up to get the most out of perUse!</p>
      </div>

      <form>
        <h5>Sign Up For An Account</h5>
        <div>
          {newUserState.failedAll ? <p style={{ color: 'red' }}>Please enter your information!</p> : null}
          {newUserState.failedSignupName ? <p style={{ color: 'red' }}>Please enter your name!</p> : null}
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='name' ref={name} />
        </div>
        <div>
          {newUserState.failedSignupUsername ? <p style={{ color: 'red' }}>Please enter your username!</p> : null}
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' ref={username} />
        </div>
        <div>
          {newUserState.failedSignupPassword ? <p style={{ color: 'red' }}>Please enter your password!</p> : null}
          <label htmlFor='password'>Password</label>
          <input type='text' id='password' name='password' ref={password} />
        </div>
        <button onClick={newUserState.handleSignUpUser}>Submit</button>
      </form>

      <h5>Already have an account? No problem!</h5>
      <Link to='/login'>
        <button>Login</button>
      </Link>
    </div>
  )
}

export default SignupPage
