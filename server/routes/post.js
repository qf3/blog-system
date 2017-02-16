var express = require('express'),
	router = express.Router(),
	marked = require('marked'),

	blogModels = require('../database/mongodb');

router.get('/',function(req,res,next){
	res.render('post');
});


router.post('/',function(req,res,next){

	var author = req.session.user.username,
		category = req.body.category,
		content = marked(req.body.body),
		tags = [category,author];
		

	var poster = {

		author:author,
		title:req.body.title,
		body:content,
		tags:tags,
		views:0,
		post_at:Date.now()
		
	}

	blogModels.blogUser.findOne({username:author})
	.exec(function(error,docs){
		//var postLength = docs.post.length;
		var bp = new blogModels.blogPost(poster);
		//bp.tags.push(postLength);
		bp.save(function(err,doc){
	 		docs.post.push(bp._id)
			docs.save();
	 		res.send(200);
	 	});
	});


	

	

	// blogModels.blogUser.findOne({post: {$not: {$size: 0}}})
	// .populate('post','body title')
	// .exec(function(err,docs){
	// 	console.log(docs);
	// 	res.send(200);
	// });
/*	var bp = new blogModels.blogPost(poster);
		bp.save(function(err,d){
			blogModels.blogUser.update({username:author},{$push:{post:d._id}}).exec(
			function(err,docs){
				console.log(docs);
				res.send(200);
			});	
		});
*/

	// var bp = new blogModels.blogPost(poster);
	// 	bp.save(function(err,d){
	// 		blogModels.blogUser.findOne({username:author}).exec(
	// 		function(err,docs){
	// 			docs.post.push(d._id)
	// 			docs.save();
	// 			console.log(docs);
	// 			res.send(200);
	// 		});	
	// 	});

	
});


module.exports = router;