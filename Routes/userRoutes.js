const axios = require('axios')

module.exports = app => {
  app.post('/signup', (req, res) => {
    axios.post('https://divercity-test.herokuapp.com/register', req.body)
      .then(({ data }) => {
        //console.log(data)
        console.log('user added')
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })

  app.post('/login', (req, res) => {
    axios.post('https://divercity-test.herokuapp.com/login', req.body)
      .then(({ data }) => {
        //console.log(data)
        console.log('user signed in')
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })
}
