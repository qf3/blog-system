var express = require('express'),
	router = express.Router(),
	moment = require('moment'),
	blogModels = require('../database/mongodb');
	check = require('../models/checklogin');


var mongoose = require('mongoose');


router.get('/:posttId',function(req,res,next){
	var postId = req.params.posttId;


	blogModels.blogPost.findOne({_id:postId})
	.populate({
		path:'comments_id'
		
	})
	.exec(function(err,docs){
	
		docs.comments_id.forEach(function(value,index,array){
			docs.comments_id[index].created= moment(docs.comments_id[index].com_at).fromNow();
		});
		docs.comments = docs.comments_id.reverse();
		res.render('content',{docs});
	});

});

router.post('/:posttId',check.checkLogin,function(req,res,next){
	var postId = req.params.posttId,
		username = req.session.user.username

	var comments = {
		commenter:username,
		body:req.body.body
	}

	blogModels.blogUser.findOne({username:username})
	.exec(function(err,docs){
		var bc = blogModels.blogComment(comments);
		docs.comments.push(bc._id);
		docs.save();
		blogModels.blogPost.findOne({_id:postId})
		.exec(function(err,doc){
			doc.comments_id.push(bc._id);
			doc.save();
			bc.save(function(err,d){

				res.redirect('back');
			});
		
		});
	});
});



















module.exports = router;