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

router.post("/abc",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var uid=req.body['uid'];
	
	/*查*/
	/*pool.query(`SELECT news_title from news where uid=${uid}`,function(err,rows,fields){
		if(err) throw err;
		res.send(rows);
	});*/
	
	/*增*/
	/*pool.query(`INSERT into news(uid,news_title) values(${uid},1111)`,function(err,rows,fields){
		if(err) throw err;
		res.send(rows);
	});*/

	/*删*/
	pool.query(`delete from news where uid=${uid}`,function(err,rows,fields){
			if(err) throw err;
			res.send(rows);
	});

	/*改*/
	/*pool.query(`update news set uid=8 where uid=2`,function(err,rows,fields){
			if(err) throw err;
			res.send(rows);
	});*/

});
module.exports=router;
