import React, { useState, useEffect } from 'react'
// , useRef
import axios from 'axios'
import JobCard from '../../components/JobCard'

const SearchPage = _ => {
  const [searchState, setSearchState] = useState({
    searchArea: '',
    searchLocation: false,
    searchType: false,
    searchSkill: false,
    jobs: [],
    location: false,
    locations: [],
    type: false,
    types: [],
    skills: false,
    skills_tags: []
  })

  useEffect(_ => {
    searchState.jobs.forEach(job => console.log('render card'))
  },
    [searchState.jobs])

  searchState.handleSearchAll = e => {
    axios.get('/jobs')
      .then(({ data }) => {
        console.log(data.jobs)
        setSearchState({ ...searchState, jobs: data.jobs })
      })
      .catch(e => console.log(e))
  }

  searchState.locationFilter = _ => {
    console.log('location dropdown appears')
    setSearchState({
      ...searchState, location: true,
      type: false,
      skills: false
    })
  }

  searchState.typeFilter = _ => {
    console.log('type dropdown appears')
    setSearchState({
      ...searchState, location: false,
      type: true,
      skills: false
    })
  }

  searchState.skillsFilter = _ => {
    console.log('skills dropdown appears')
    setSearchState({
      ...searchState, location: false,
      type: false,
      skills: true
    })
  }

  return (
    <div>
      <p>This is the search page</p>
      <ul>
        <li>text about the page</li>
        <button id='searchAll' onClick={searchState.handleSearchAll}>Display All Jobs</button>
        <li>Filter by:</li>
        <input type='radio' name='filter' id='locationRadio' onClick={searchState.locationFilter} /><label htmlFor='locationRadio'>Location</label>
        <input type='radio' name='filter' id='typeRadio' onClick={searchState.typeFilter} /><label htmlFor='typeRadio'>Type of Job</label>
        <input type='radio' name='filter' id='skillsRadio' onClick={searchState.skillsFilter} /><label htmlFor='skillsRadio'>Skills</label>

        {searchState.location ? <h6>Location Dropdown</h6> : searchState.type ? <h6>Type Dropdown</h6> : searchState.skills ? <h6>Skills Dropdown</h6> : null}

        <li>dynamically showing second dropdown for location, type, or skills (search all jobs, find listed attributes, put in new Set, display)</li>
        <li>search button that verifies input</li>
      </ul>
      <p>Display all jobs matching search criteria, one card for each.</p>
      <JobCard />
    </div>
  )
}

export default SearchPage
