module.exports = (Schema, model) => {
  const User = new Schema({
    name: String,
    email: String
  })
  return model('User', User)
}
