import React from 'react'

const SignupPage = _ => {
  return (
    <div>
      <p>This is the signup page.</p>
      <p>Text about benefits of signing up.</p>
      <p>Three boxes and validating submit button:</p>
      <li>Name</li>
      <li>email</li>
      <li>password (validate against second entry?)</li>
      <li>remember me box, sets local storage</li>
      <li>submit button, redirects to landing page if successful, sets session storage</li>
    </div>
  )
}

export default SignupPage
