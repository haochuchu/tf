var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var pool=require("./../config.js");

router.post("/carousel",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");

	
		pool.query('SELECT * from carousel',function(err,rows,fields){
		if(err) throw err;
		res.send(rows);
	});

});
module.exports=router;