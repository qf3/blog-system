var mongoose = require('mongoose'),
	config = require('config-lite');


	mongoose.Promise = global.Promise;
	mongoose.connect(config.mongodb);

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username:{
		type:String,
		required:true,
		maxLenth:20
	},
	password:{
		type:String,
		required:true,
		mixLenth:8
	},
	roles:{
			cwriter:{type:Boolean,default:true},
			pwriter:{type:Boolean,default:false}
	},
	gender:String,
	comments:[{type:Schema.Types.ObjectId,ref:'blogComment'}],
	post:[{type:Schema.Types.ObjectId,ref:'blogPost'}],
	res_date:{type:Date,default:Date.now()},
	log_date:{type:Date,default:Date.now()}
});
var blogUser = mongoose.model('blogUser',userSchema);
exports.blogUser = blogUser;


var commentsSchema = new Schema({
	commenter:String,
	body:String,
	opinions:{
			s:{type:Number,default:0},
			d:{type:Number,default:0}
	},
	com_at:{type:Date,default:Date.now()}
});
var blogComment = mongoose.model('blogComment',commentsSchema);
exports.blogComment = blogComment;


var postSchema = new Schema({
	author:String,
	title:String,
	body:String,
	tags:Array,
	comments_id:[{type:Schema.Types.ObjectId,ref:'blogComment'}],
	views:Number,
	post_at:{type:Date,default:Date.now()}
});
var blogPost = mongoose.model('blogPost',postSchema);
exports.blogPost = blogPost;





// comments:[{
// 			post_id:String,
// 			body:String,
// 			com_at:{type:Date,default:Date.now()}
// 	}],
// 	post:[{
// 			post_id:String,
// 			author:String,
// 			title:String,
// 			body:String,
// 			tags:String,
// 			post_at:{type:Date,default:Date.now()}
// 	}],






