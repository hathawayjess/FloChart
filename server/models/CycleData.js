var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cycleSchema = new Schema({
  index: {
    type: Number
  },
  phase: {
    type: Schema.Types.Mixed
  },
  data: {
    type: String
  },
  current: {
    type: Boolean
  },
  date: {
    type: Number
  }
})

//gamify devmountain




module.exports = mongoose.model("CycleData", cycleSchema);
