const express = require('express');
var router = express().Router;

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

//check in 
router.put('/checkout', (req, res) => {
// Handle put request
  db.collection('hotels')
  .findOneAndUpdate({hotel_id: req.body.hotel_id}, {
    $inc: {  
    	hotel_availbility: -1
    } 
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})