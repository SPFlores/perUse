import React, { useState, useRef } from 'react'
import qs from 'qs'
import axios from 'axios'

// Apply takes job ID, title from session storage
// displays 2 input boxes: motivation, cover letter
// submit button validates both
// axios request to API to apply
// pull user token from session storage

const ApplyPage = _ => {
  const motivation = useRef()
  const coverLetter = useRef()

  const [applicationState, setApplicationState] = useState({
    user: ''
  })

  applicationState.handleApply = e => {
    e.preventDefault()
    // check the user is logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      console.log('user is logged in')
      // check each box has text
      if (motivation.current.value === '' && coverLetter.current.value === '') {
        console.log('both empty')
      } else if (motivation.current.value === '') {
        console.log('you need motivation')
      } else if (coverLetter.current.value === '') {
        console.log('cover that damn letter')
      } else {
        const token = 'Shh secret token'
        // sessionStorage.getItem('token')
        const jobID = '2'
        const applicationInfo = {
          motivation: motivation.current.value,
          cover_letter: coverLetter.current.value
        }
        const applicationString = qs.stringify(applicationInfo)
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': token
        }
        // sessionStorage.getItem('jobID')
        axios.post(`/apply/${jobID}/${token}`, applicationString, headers)
          .then(_ => {
            // display textbox saying applied
            // show button linking back to search
            console.log('hit apply post successfully')
          })
          .catch(e => console.log(e))
      }
    } else {
      console.log('user is not logged in')
    }
    console.log('you applied!')
    console.log(motivation.current.value)
    console.log(coverLetter.current.value)
  }

  return (
    <div>
      <p>Apply for "title of job"</p>
      <label htmlFor='motivation'>Motivation</label>
      <br />
      <input type='text' name='motivation' id='motivation' ref={motivation} />
      <br />
      <label htmlFor='coverLetter'>Cover letter</label>
      <br />
      <input type='text' name='coverLetter' id='coverLetter' ref={coverLetter} />
      <br />
      <button onClick={applicationState.handleApply}>Apply!</button>
    </div>
  )
}

export default ApplyPage