'use strict'

const
  CycleData = require('../models/CycleData.js')
, DayData   = require('../models/DayData.js')
, MoodData  = require('../models/MoodData.js')
, mongoose  = require('mongoose')

module.exports = {

  addCycleData (req, res, next) {
    CycleData.remove((error, data) => {})
    CycleData.create(req.body, (error, response) => {
      if (error) {
        return res.status(500).send(error)
      }
      res.send(response)
    })
  }

, getCycleData (req, res, next) {
    CycleData.find(req.body)
    .sort('_id')
    .exec((error, data) => {
      if (error) {
        return res.status(500).send(error)
      }
      return res.status(200).send(data)
    })
  }

, postDayData (req, res, next) {
    DayData.create(req.body, (error, response) => {
      if (error) {
        return res.status(500).send(error)
      }
      res.send(response)
    })
  }

, getDayData (req, res, next) {
    DayData.find(req.body)
    .populate('mood')
    .exec((error, data) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(data)
    })
  }

, postMoodData (req, res, next) {
    MoodData.findOneAndUpdate({
      _id : req.body._id
    }, req.body, {
      upsert : true
    , 'new': true
    }, (err, response) => {
      res.send(response)
    })
  }

, getMoodData (req, res, next) {
    MoodData.find(req.body)
    .sort('_id')
    .exec((error, data) => {
      if (error) {
        return res.status(500).send(error)
      }
      res.send(data)
    })
  }

}

