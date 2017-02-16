var express = require('express'),
	router = express.Router(),	
	blogModels = require('../database/mongodb');




router.post('/registerCheck',function(req,res,next){
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

	blogModels.blogUser.findOne({username:user.username},{username:1,password:1},function(err,docs){
			if (docs) {
				// console.log('用户名已存在');
				res.send(false);
				return;
			}else{
				res.send(true);
				// console.log('不存在');
				// console.log(docs);
				
			}
		
		});
});


router.post('/loginCheck',function(req,res,next){

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

	blogModels.blogUser.findOne({username:user.username},{username:1,password:1},function(err,docs){
			if (!docs) {
				//console.log('用户名不存在');
				res.send({n:false});
				return;
			}
			if (user.password!==docs.password) {
				//console.log('密码错误');
				res.send({p:false});
				return;
			}
			res.send(200);
		});

});	

module.exports = router;