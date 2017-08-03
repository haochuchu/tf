var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var pool=require("./../config.js");

router.post("/bundle",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");

	
		pool.query('SELECT * from bundle',function(err,rows,fields){
		if(err) throw err;
		res.send(rows);
	});

});
module.exports=router;