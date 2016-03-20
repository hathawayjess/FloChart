var CycleData = require('../models/CycleData.js');
var mongoose = require('mongoose');

module.exports = {
  addCycleData: function(req, res, next) {
    CycleData.remove(function(error, data) {
      console.log('removed');
    })
    CycleData.create(req.body, function(error, response) {
      if (error) {
        return res.json(error);
        console.log('error!');
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

//find and save empty array
//if you can find something, set to empty array
//if not, create array
