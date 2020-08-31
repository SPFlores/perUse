const axios = require('axios')

module.exports = app => {
  app.get('/jobs', (req, res) => {
    axios.get('https://divercity-test.herokuapp.com/jobs')
      .then(({ data }) => {
        res.json(data)
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })

  //app.get('/jobs/:id', (req, res) => {
  //axios.get('https://divercity-test.herokuapp.com/jobs')
  //.then(({ data }) => {
  //console.log(data)
  //go through list, find all with given skills_tag
  //res.sendStatus(200)
  //})
  //.catch(e => console.log(e))
  //})

}
