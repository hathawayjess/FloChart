var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cycleSchema = new Schema ({
  index: {type: Number},
  phase: {type: Number},
  data: {type: String}
})

//gamify devmountain




module.exports = mongoose.model("CycleData", cycleSchema);
