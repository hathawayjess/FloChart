'use strict'

const
  express     = require('express')
, bodyParser  = require('body-parser')
, cors        = require('cors')
, mongoose    = require('mongoose')
, backendCtrl = require('./controllers/backendCtrl.js')
, app         = express()
, port        = process.env.PORT || 3000
, corsOptions = {origin : 'http://127.0.0.1:' + port}

mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/cycleData')
mongoose.connection.once('open', () => console.log('Connected to MongoDB'))

app

.use(cors(corsOptions))
.use(bodyParser.json())
.use(express.static(__dirname + '/public/www/'))

.post('/data', backendCtrl.addCycleData)
.get('/data', backendCtrl.getCycleData)

.post('/daydata', backendCtrl.postDayData)
.get('/daydata', backendCtrl.getDayData)

.post('/mooddata', backendCtrl.postMoodData)
.get('/mooddata', backendCtrl.getMoodData)

.listen(port, () => console.log(`listening on ${port}`))

