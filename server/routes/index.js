var express = require('express'),
	router = express.Router(),
	moment = require('moment'),


	blogModels = require('../database/mongodb');


router.get('/',function(req,res,next) {

	blogModels.blogPost.find()
	.sort({post_at:-1})
	.exec(function(err,docs){
		docs.forEach(function(value,index,array){
			docs[index].created = moment(docs[index].post_at).format('YYYY-MM-DD dddd HH:mm:ss');
			docs[index].content = docs[index].body.substr(0,50)+'······';

		})
		res.render('index',{docs});
	});

	
});



module.exports = router;