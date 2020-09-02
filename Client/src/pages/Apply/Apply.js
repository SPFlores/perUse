import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'

const ApplyPage = _ => {
  const motivation = useRef()
  const coverLetter = useRef()

  const [applicationState, setApplicationState] = useState({
    didApply: false,
    isLoggedIn: false,
    failedBoth: false,
    failedMotivation: false,
    failedCover: false
  })

  applicationState.handleApply = e => {
    e.preventDefault()
    // check the user is logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      console.log('user is logged in')
      setApplicationState({ ...applicationState, isLoggedIn: true })
      // check each box has text
      if (motivation.current.value === '' && coverLetter.current.value === '') {
        setApplicationState({
          ...applicationState,
          failedBoth: true,
          failedMotivation: false,
          failedCover: false
        })
      } else if (motivation.current.value === '') {
        setApplicationState({
          ...applicationState,
          failedBoth: false,
          failedMotivation: true,
          failedCover: false
        })
      } else if (coverLetter.current.value === '') {
        setApplicationState({
          ...applicationState,
          failedBoth: false,
          failedMotivation: false,
          failedCover: true
        })
      } else {
        const token = 'Shh secret token'
        // sessionStorage.getItem('token')
        const jobID = '2'
        // sessionStorage.getItem('jobID')
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
        <p>Apply for {sessionStorage.getItem('jobTitle')}}</p>
        {applicationState.failedBoth ? <p style={{ color: 'red' }}>Please enter your information!</p> : null}
        {applicationState.failedMotivation ? <p style={{ color: 'red' }}>Please enter your motivation!</p> : null}
        <label htmlFor='motivation'>Motivation</label>
        <br />
        <input type='text' name='motivation' id='motivation' ref={motivation} />
        <br />
        {applicationState.failedCover ? <p style={{ color: 'red' }}>Please enter your cover letter!</p> : null}
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
