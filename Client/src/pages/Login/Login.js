import React from 'react'

const LoginPage = _ => {
  return (
    <div>
      <p>This is the login page</p>
      <p>Needs:</p>
      <li>Text about logging in</li>
      <li>box for email</li>
      <li>box for password</li>
      <li>checkbox for "remember me" that sets local storage</li>
      <li>submit button that validates both fields filled, validates correct login</li>
      <li>search button redirects to landing page</li>
    </div>
  )
}

export default LoginPage
