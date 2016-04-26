'use strict'

const
  mongoose = require('mongoose')
, Schema   = mongoose.Schema

var moodData = new Schema({
  _id  : {type : Number}
, mood : {type : Number}
, date : {type : Date}
})

module.exports = mongoose.model('MoodData', moodData)

