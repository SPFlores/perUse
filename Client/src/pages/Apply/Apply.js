import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
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
    didApply: false,
    isLoggedIn: false
  })

  applicationState.handleApply = e => {
    e.preventDefault()
    // check the user is logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      console.log('user is logged in')
      setApplicationState({ ...applicationState, isLoggedIn: true })
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
          'motivation': motivation.current.value,
          'cover_letter': coverLetter.current.value
        }
        const applicationString = qs.stringify(applicationInfo)
        const headers = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': token
          }
        }
        axios.post(`/apply/${jobID}/${token}`, applicationString, headers)
          .then(_ => {
            setApplicationState({ ...applicationState, didApply: true })
            console.log('hit apply post successfully')
          })
          .catch(e => console.log(e))
      }
    } else {
      setApplicationState({ ...applicationState, isLoggedIn: false })
    }
  }

  return (
    <div>
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
      <div>
        {applicationState.didApply
          ? <div>
            <p>You have applied. Good luck!</p>
            <Link to='/search'>
              <button>Back to search</button>
            </Link>
          </div> : null}
      </div>
    </div>
  )
}

export default ApplyPage
