var CycleData = require('../models/CycleData.js');
var DayData = require('../models/DayData.js');
var MoodData = require('../models/MoodData.js');
var mongoose = require('mongoose');


module.exports = {
  addCycleData: function(req, res, next) {
    CycleData.remove(function(error, data) {})
    CycleData.create(req.body, function(error, response) {
      if (error) return res.status(500).send(error);
      res.send(response);
    })
  },
  getCycleData: function(req, res, next) {
    CycleData.find(req.body)
    .sort("_id")
      .exec(function(error, data) {
        if (error) return res.status(500).send(error);
        return res.status(200).send(data);
      })
  },
  postDayData: function(req, res, next) {
    DayData.create(req.body, function(error, response) {
      if (error) return res.status(500).send(error);
      res.send(response);
    })
  },
  getDayData: function(req, res, next) {
    DayData.find(req.body)
      .populate("mood")
      .exec(function(error, data) {
        if (error) return res.status(500).send(error);
        res.send(data);
      })
  },
  postMoodData: function(req, res, next) {

    MoodData.findOneAndUpdate({
      _id: req.body._id
    }, req.body, {
      upsert: true,
      'new': true
    }, function(err, response) {
      res.send(response);
    });

  }


}
