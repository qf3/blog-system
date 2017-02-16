var express = require('express'),
	router = express.Router();
	

router.get('/',function(req,res,next){

	res.render('login');
});


router.post('/',function(req,res,next){
	var name = req.body.name,
		password = req.body.password



	var normalName = name.replace(/\s+/g,"").toLowerCase(),
		normalPassword = password.replace(/\s+/g,"");
		
	var user = {
		username:normalName,
		password:normalPassword,
	}



	//用户信息写入session
	delete user.password;
    req.session.user = user;
	res.redirect('/');
	
		
	

});

module.exports = router;