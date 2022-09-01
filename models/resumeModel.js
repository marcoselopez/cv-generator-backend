const { Schema, model } = require('mongoose');

const resumeModel = new Schema({
  firstName: String,
  lastName: String,
  profession: String,
  nationality: String,
  phone: String,
  email: String,
  description: String,
  github: String,
  linkedin: String,
  portfolio: String,
  educations: [String],
  experiences: [String],
  skills: [String],
});

module.exports = model('Resume', resumeModel);