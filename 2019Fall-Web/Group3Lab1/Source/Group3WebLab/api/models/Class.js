var mongoose = require('mongoose')

var classSchema = new mongoose.Schema({
  title: String,
  department: String,
  number: String,

  start_date: Date,
  stop_date: Date,
  schedule: String,

  instructor: String,
  topic: String,
  format: String,
  description: String,
  notes: String,

  active: Number
});

module.exports = mongoose.model('Class', classSchema);
