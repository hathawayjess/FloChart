//REQUIRE DEPENDENCIES
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var backendCtrl = require('./controllers/backendCtrl.js');

var app = express();
var corsOptions = {
  origin: 'http://localhost:8100'
};


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/cycleData");
mongoose.connection.once("open", function() {
  console.log("Connected to MongoDB");
})

//ENDPOINTS

app.post('/data', backendCtrl.addCycleData);
app.get('/data', backendCtrl.getCycleData);

app.post('/daydata', backendCtrl.postDayData);
app.get('/daydata', backendCtrl.getDayData);

app.post('/mooddata', backendCtrl.postMoodData);




app.listen(3000, function() {
  console.log('listening on port ' + 3000);
});
