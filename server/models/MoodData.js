var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moodData = new Schema({
  _id: {type: Number},
  mood: {type: Number},
  date: {type: Date}
})

module.exports = mongoose.model("MoodData", moodData);
