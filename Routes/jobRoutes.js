const { Job } = require('../Models')
const axios = require('axios')

module.exports = app => {
  app.get('/jobs', (req, res) => {
    axios.get('https://divercity-test.herokuapp.com/jobs')
      .then(({ data }) => {
        console.log(data)
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })
}
