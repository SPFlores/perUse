import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchPage = _ => {
  const [searchState, setSearchState] = useState({
    jobs: [],
    location: false,
    locations: [],
    skills: false,
    skills_tags: [],
    type: false,
    types: [],
    renderCount: 0
  })

  useEffect(_ => {
    searchState.jobs.forEach(_ => setSearchState({ ...searchState, renderCount: searchState.renderCount + 1 }))
  }, [searchState.jobs])

  searchState.handleSearchAll = e => {
    axios.get('/jobs')
      .then(({ data }) => {
        console.log(data.jobs)
        setSearchState({ ...searchState, jobs: data.jobs })
      })
      .catch(e => console.log(e))
  }

  searchState.locationFilter = _ => {
    axios.get('/jobs')
      .then(({ data }) => {
        const locationsArr = data.jobs.map(job => job.location)
        const realLocations = locationsArr.filter(loc => typeof loc !== 'undefined')
        const locationOptions = new Set(realLocations)
        setSearchState({
          ...searchState,
          location: true,
          locations: [...locationOptions],
          type: false,
          skills: false
        })
      })
      .catch(e => console.log(e))
  }

  searchState.typeFilter = _ => {
    axios.get('/jobs')
      .then(({ data }) => {
        const typeArr = data.jobs.map(job => job.job_type)
        const realTypes = typeArr.filter(type => typeof type !== 'undefined')
        const typeOptions = new Set(realTypes)
        setSearchState({
          ...searchState,
          location: false,
          type: true,
          types: [...typeOptions],
          skills: false
        })
      })
      .catch(e => console.log(e))
  }

  searchState.skillsFilter = _ => {
    axios.get('/jobs')
      .then(({ data }) => {
        const skillsRaw = data.jobs.map(job => job.skills_tag)
        const skillsArr = [].concat.apply([], skillsRaw)
        const realSkills = skillsArr.filter(skill => typeof skill !== 'undefined')
        const skillOptions = new Set(realSkills)
        setSearchState({
          ...searchState,
          location: false,
          type: false,
          skills_tags: [...skillOptions],
          skills: true
        })
      })
      .catch(e => console.log(e))
  }

  searchState.filterJobs = ({ target }) => {
    const value = target.id
    const filter = target.className
    axios.get('/jobs')
      .then(({ data }) => {
        if (filter === 'location') {
          const validJobs = data.jobs.filter(job => { return job.location === value })
          setSearchState({ ...searchState, jobs: validJobs })
        } else if (filter === 'type') {
          const validJobs = data.jobs.filter(job => { return job.job_type === value })
          setSearchState({ ...searchState, jobs: validJobs })
        } else if (filter === 'skills') {
          const validJobs = data.jobs.filter(job => job.skills_tag.includes(value))
          setSearchState({ ...searchState, jobs: validJobs })
        } else console.log('not working')
      })
      .catch(e => console.log(e))
  }

  searchState.getLocationOptions = _ => {
    const listItems = searchState.locations.map(location =>
      <div key={searchState.locations.indexOf(location)}>
        <button className='location' id={location} key={location} onClick={searchState.filterJobs}>{location}</button>
      </div>
    )
    return <ul>{listItems}</ul>
  }

  searchState.getTypeOptions = _ => {
    const listItems = searchState.types.map(type =>
      <div key={searchState.types.indexOf(type)}>
        <button className='type' id={type} key={type} onClick={searchState.filterJobs}>{type}</button>
      </div>
    )
    return <ul>{listItems}</ul>
  }

  searchState.getSkillOptions = _ => {
    const listItems = searchState.skills_tags.map(skill =>
      <div key={searchState.skills_tags.indexOf(skill)}>
        <button className='skills' id={skill} key={skill} onClick={searchState.filterJobs}>{skill}</button>
      </div>
    )
    return <ul>{listItems}</ul>
  }

  searchState.renderCards = _ => {
    const jobCards = searchState.jobs.map(job =>
      <div key={job.id}>
        <h4>Title: {job.title}</h4>
        <h5>Company: {job.company}</h5>
        <h5>Type: {job.job_type}</h5>
        <h5>Location: {job.location}</h5>
        {/* It is acknowledged that the below is not best practice when importing data from outside APIs for consumption. However, it does allow for the most flexibility in terms of consuming this particular API and is limited in scope to this small project. An alternative would be to import the description and .replace() all tags with apces, however this does not allow for flexibility in formatting of description. */}
        <div dangerouslySetInnerHTML={{ __html: job.description }} />
        <p>Skills: {job.skills_tag.join(', ')}</p>
        <p>Applicant count: {job.applicant_count}</p>
        <button>Apply</button>
      </div>)
    return <ul>{jobCards}</ul>
  }

  return (
    <div>
      <p>This is the search page</p>
      <ul>
        <li>text about the page</li>
        <button id='searchAll' onClick={searchState.handleSearchAll}>Display All Jobs</button>
        <li>Filter by:</li>
        <button id='locationButton' onClick={searchState.locationFilter}>Location</button>
        <button id='typeButton' onClick={searchState.typeFilter}>Type of Job</button>
        <button id='skillsButton' onClick={searchState.skillsFilter}>Skills</button>

        {searchState.location ? searchState.getLocationOptions() : searchState.type ? searchState.getTypeOptions() : searchState.skills ? searchState.getSkillOptions() : null}

        <li>search button that verifies input</li>
      </ul>
      <p>Display all jobs matching search criteria, one card for each.</p>
      {searchState.renderCount > 0 ? searchState.renderCards() : null}
    </div>
  )
}

export default SearchPage
