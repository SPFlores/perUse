const { Schema, model } = require('mongoose')

const db = {
  Job: require('./Job')(Schema, model),
  User: require('./User.js')(Schema, model)
}

module.exports = db
