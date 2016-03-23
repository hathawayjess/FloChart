var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var daySchema = new Schema({
  index: {type: Number},
  data: {type: String}
})

module.exports = mongoose.model("DayData", daySchema);
