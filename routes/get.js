var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var pool=mysql.createPool({
	host:"127.0.0.1",//localhost
	user:"root",//用户名
	password:"",//密码
	database:"haochuchu",//数据库
	port:"3306"
});

router.get("/abc",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	
	pool.query('SELECT * from news',function(err,rows,fields){
		if(err) throw err;
		res.send(rows);
	});
	/*res.send(
		[
			{name:'haochuchu',title:'1111'},
			{name:'cc',title:'2222'},
			{name:'hh',title:'3333'},
			{name:'dd',title:'4444'}
		]
	);*/
});
module.exports=router;
