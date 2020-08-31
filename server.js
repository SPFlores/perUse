const express = require('express')
const { join } = require('path')
const app = express()
require('dotenv').config()

app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./Routes')(app)

require('mongoose').connect(process.env.MONGO_LINK, { useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true })
  .then(_ => {
    app.listen(process.env.PORT || 3003)
  })
  .catch(e => console.log(e))
