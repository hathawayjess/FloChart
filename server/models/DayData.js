var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dayData = new Schema({
  _id: {
  type: Number
},
  string: {type: String}
})

module.exports = mongoose.model("DayData", dayData);
