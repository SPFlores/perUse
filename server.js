const express = require('express')
const app = express()
require('dotenv').config()

require('./Routes')(app)

require('mongoose').connect(process.env.MONGO_LINK, { useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true })
  .then(_ => {
    app.listen(process.env.PORT || 3003)
  })
  .catch(e => console.log(e))
