var express = require('express'),
	router = express.Router(),
	

	blogModels = require('../database/mongodb');

router.get('/',function(req,res,next){

	res.render('register');
});


router.post('/',function(req,res,next){
	var name = req.body.name,
		password = req.body.password,
		repassword = req.body.repassword,
		gender = req.body.gender;


	var normalName = name.replace(/\s+/g,"").toLowerCase(),
		normalPassword = password.replace(/\s+/g,"");
		
	var user = {
		username:normalName,
		password:normalPassword,
		gender:gender
	}

	blogModels.blogUser.create(user,function(err,docs){
		if (err) {
			console.log(err);
		}
		delete user.password;
    	req.session.user = user;
		res.redirect('/');
	});
});

module.exports = router;