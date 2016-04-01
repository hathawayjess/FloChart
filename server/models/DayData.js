var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dayData = new Schema({
  _id: {type: Number},
  string: {type: String},
  mood: {type: Schema.Types.ObjectId, ref: 'MoodData'}
})

module.exports = mongoose.model("DayData", dayData);
