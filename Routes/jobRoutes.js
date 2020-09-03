const axios = require('axios')

module.exports = app => {
  app.get('/jobs', (req, res) => {
    axios.get('https://divercity-test.herokuapp.com/jobs')
      .then(({ data }) => {
        res.json(data)
        console.log('button was clicked')
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })
}
