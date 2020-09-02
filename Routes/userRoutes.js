const axios = require('axios')

module.exports = app => {
  app.post('/signup', (req, res) => {
    axios.post('https://divercity-test.herokuapp.com/register', req.body)
      .then(_ => {
        console.log('user added')
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })

  app.post('/login', (req, res) => {
    axios.post('https://divercity-test.herokuapp.com/login', req.body)
      .then(_ => {
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })
}
