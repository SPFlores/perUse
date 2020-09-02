const axios = require('axios')

module.exports = app => {
  app.post('/apply/:id/:token', (req, res) => {
    axios.post(`https://divercity-test.herokuapp.com/jobs/${req.params.id}/apply`, req.body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': `${req.params.token}`
      }
    })
      .then(_ => {
        res.sendStatus(200)
      })
      .catch(e => {
        console.log(e)
      }
      )
  })
}
