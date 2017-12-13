
const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
var router = express.Router();

router.use(express.static('public'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var db;
MongoClient.connect('mongodb://QHC:vandy2018@ds137336.mlab.com:37336/cloudproject', (err, database) => {
        if (err) {
               console.log(err);
        }
        db = database
});

//check in
router.post('/checkout', function(req, res){
        var hotel_id = req.body.hotel_id;
        var out = {
                'content' : ''
        };
        // Handle put request
        db.collection('hotels').findOneAndUpdate({hotel_id: req.body.hotel_id}, {
                $inc: {
                        hotel_availability: 1
                }
        }, {
                sort: {_id: -1},
                upsert: true
        }, (err, result) => {
                if (err) {
                        out.content = 'fail';
                } else {
                        out.content = 'success';
                }
                res.send(out);
        })
})

module.exports=router;
