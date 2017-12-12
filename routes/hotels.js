const express = require('express');
var router = express.Router();

// router.post('/hotels', (req, res) => {
//   db.collection('hotels').find().toArray((err, result) => {
//     if (err) return console.log(err)
//     console.log("hotel results are: ")
//     res.render('index.ejs', {hotels: result})
//   })
// })

//search hotel id
router.post('/hotels',function(req,res){
	var hotel_id = req.body.hotel_id;
	var out = {
		'hotel_name':'',
		'hotel_address':'',
		'hotel_availability':'',
		'hotel_rating':''
	};	
	db.collection('hotels').findOne({hotel_id: hotel_id}).toArray((err, result) => {
    if(err){
			out.hotel_name = 'fail';
			console.log(err.stack)
			res.send(out);
		}
   	else{
			out.hotel_name = result[hotel_id];
			out.hotel_address = result[hotel_address];
			out.hotel_availability = result[hotel_availability];
			out.hotel_rating = result[hotel_rating];
			res.send(out);
		}
	})
});

module.exports=router;
