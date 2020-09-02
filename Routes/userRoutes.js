const axios = require('axios')

module.exports = app => {
  app.post('/register', (req, res) => {
    axios.post('https://divercity-test.herokuapp.com/register', req.body)
      .then(_ => {
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })

  app.post('/login', (req, res) => {
    axios.post('https://divercity-test.herokuapp.com/login', req.body)
      .then(({ data }) => {
        res.json(data)
        // res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })
}
