var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cycleSchema = new Schema({
  _id: {
    type: Number
  },
  index: {
    type: Number
  },
  phase: {
    type: Schema.Types.Mixed
  },
  data: {
      string: {type: String},
      mood: {type: Number}
  },
  current: {
    type: Boolean
  },
  date: {
    type: Number
  }
})






module.exports = mongoose.model("CycleData", cycleSchema);
