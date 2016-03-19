var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cycleSchema = new Schema ({
  index: {type: Number, required: true},
  phase: {type: Number, required: true},
  data: {type: String, required: false}
})

// var cycleSchema = new Schema ({})



module.exports = mongoose.model("CycleData", cycleSchema);
