var CycleData = require('../models/CycleData.js');
var DayData = require('../models/DayData.js')
var mongoose = require('mongoose');

//function

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
      .exec(function(error, data) {
        if (error) return res.status(500).send(error);
        res.send(data);
      })
  }

}

//req.params.id
//DayData.find index === req.params.id
