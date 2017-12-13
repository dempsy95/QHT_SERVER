const express = require('express');
const MongoClient = require('mongodb').MongoClient
var router = express.Router();

// router.post('/hotels', (req, res) => {
//   db.collection('hotels').find().toArray((err, result) => {
//     if (err) return console.log(err)
//     console.log("hotel results are: ")
//     res.render('index.ejs', {hotels: result})
//   })
// })
var db;
MongoClient.connect('mongodb://QHC:vandy2018@ds137336.mlab.com:37336/cloudproject', (err, database) => {
        if (err) {
               console.log(err);
        } else {
               console.log("mlab in cities.js successfully connected");
        }
        db = database
});

//search hotel id
router.post('/hotels',function(req,res){
	var hotel_id = req.body.hotel_id;
	var out = {
		'content' : '',
		'hotel_name':'',
		'hotel_address':'',
		'hotel_availability':'',
		'hotel_rating':''
	};	
	db.collection('hotels').find({hotel_id: hotel_id}).toArray((err, result) => {
    if(err){
			out.content = 'fail';
			console.log(err.stack);
			res.send(out);
		}
   	else{
			out.content = 'success';
			console.log(result);
			out.hotel_name = result[0]['hotel_name'];
			out.hotel_address = result[0]['hotel_address'];
			out.hotel_availability = result[0]['hotel_availability'];
			out.hotel_rating = result[0]['hotel_rating'];
			res.send(out);
		}
	})
});

module.exports=router;
