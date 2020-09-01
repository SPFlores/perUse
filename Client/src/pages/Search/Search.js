import React from 'react'

const SearchPage = _ => {
  return (
    <div>
      <p>This is the search page</p>
      <ul>
        <li>text about the page</li>
        <li>button to display all jobs</li>
        <li>dropdown to set location, type, or skills</li>
        <li>dynamically showing second dropdown for location, type, or skills (search all jobs, find listed attributes, put in new Set, display)</li>
        <li>search button that verifies input</li>
      </ul>
      <p>Display all jobs matching search criteria, one card for each.</p>
    </div>
  )
}

export default SearchPage
