
console.log('Hotel Recommendation Service')
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}));

var db 
// database connection
MongoClient.connect('mongodb://QHC:vandy2018@ds137336.mlab.com:37336/cloudproject', (err, database) => {
  if (err) return console.log(err)
  db = database
  // listen to server
  app.listen(3000, () => {
    console.log('listening on 3000')
  });
});
// Set view engine
app.set('view engine', 'ejs')

//Get the information 
app.get('/', (req, res) => {
  db.collection('hotels').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log("hotel results are: ")
    res.render('index.ejs', {hotels: result})
  })
})
var hotels = require('./routes/hotels');
var cities = require('./routes/cities');
var checkin = require('./routes/checkin');
var checkout = require('./routes/checkout');

app.use('/', hotels);
app.use('/',cities);
app.use('/', checkin);
app.use('/', checkout);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

// add infomration to database
app.post('/hotels', (req, res) => {
  db.collection('hotels').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to hotels database')
    res.redirect('/')
  });
});

app.post('/cities', (req, res) => {
  db.collection('cities').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to cities database')
    res.redirect('/')
  });
});


// Update the database information
app.use(express.static('public'))
app.use(bodyParser.json())
app.put('/hotels', (req, res) => {
// Handle put request
  db.collection('hotels')
  .findOneAndUpdate({hotel_id: '01'}, {
    $set: {
      hotel_id: req.body.hotel_id,
      hotel_name: req.body.hotel_name
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})





