module.exports = (Schema, model) => model('Job', new Schema({
  id: Number,
  title: String,
  description: String,
  location: String,
  company: String,
  job_type: String,
  applicant_count: Number,
  skills_tag: Array
}))
