var CycleData = require('../models/CycleData.js');
var mongoose = require('mongoose');

module.exports = {
  addCycleData: function(req, res, next) {
    CycleData.create(req.body, function(error, response) {
      if (error) {
        return res.status(500).json(error);
      } else {
        return res.json(response);
      }
    })
  },
  getCycleData: function(req, res, next) {
    CycleData.find(function(error, data) {
      return res.status(200).send(data);
    })
  }
}
