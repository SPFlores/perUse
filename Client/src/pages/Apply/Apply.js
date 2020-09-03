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
    console.log(motivation.current.value)
    if (sessionStorage.getItem('isLoggedIn') === 'true' && sessionStorage.getItem('token').length > 0) {
      console.log('user is logged in')
      setApplicationState({ ...applicationState, isLoggedIn: true })
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
        const token = sessionStorage.getItem('token')
        const jobID = sessionStorage.getItem('jobID')
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
      alert('please log in to apply')
      setApplicationState({ ...applicationState, isLoggedIn: false })
    }
  }

  return (
    <div class='mainArea'>
      <div>
        <h3 id='applicationTitle'>Application for {sessionStorage.getItem('title')}</h3>
        {applicationState.failedBoth ? <p style={{ color: '#ef6461' }}>Please enter your information!</p> : null}
        {applicationState.failedMotivation ? <p style={{ color: '#ef6461' }}>Please enter your motivation!</p> : null}
        <label htmlFor='motivation' >Motivation</label>
        <br />
        <textarea name='motivation' id='motivationInput' ref={motivation} />
        <br />
        {applicationState.failedCover ? <p style={{ color: '#ef6461' }}>Please enter your cover letter!</p> : null}
        <label htmlFor='coverLetter'>Cover letter</label>
        <br />
        <textarea name='coverLetter' id='coverLetterInput' ref={coverLetter} />
        <br />
        <button onClick={applicationState.handleApply} class='applicationBtn'>Apply!</button>
      </div>
      <div>
        {applicationState.didApply
          ? <div>
            <h6 id='appSuccess'>You have applied. Good luck!</h6>
            <Link to='/search'>
              <button class='applicationBtn'>Back to search</button>
            </Link>
          </div> : null}
      </div>
    </div>
  )
}

export default ApplyPage
