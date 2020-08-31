module.exports = app => {
  require('./jobRoutes.js')(app)
  require('./userRoutes.js')(app)
}
