const express = require('express');
const MongoClient = require('mongodb').MongoClient
var router = express.Router();

var db;
MongoClient.connect('mongodb://QHC:vandy2018@ds137336.mlab.com:37336/cloudproject', (err, database) => {
	if (err) {
               console.log(err);
        }
        db = database
});

//search cities 
router.post('/cities',function(req,res){
	var city = req.body.hotel_city;
	var out = {
		'content':''
	};	
	db.collection('hotels').find( { hotel_city: city, hotel_availability: {$gt:0 }}).toArray((err, result) => {
    if(err){
			out.content = 'fail';
			console.log(err.stack);
			res.send(out);
		}
   	else{
			var ret = [];
			result.forEach(function(hotel){
				var dic = {
					'id' : hotel['hotel_id'],	
					'name' : hotel['hotel_name'],
					'address' : hotel['hotel_address']
				}
				ret.push(dic);
			});
			out.content = ret;
			res.send(out);
		}
	})
});

module.exports=router;
