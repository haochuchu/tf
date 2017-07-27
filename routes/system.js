var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var pool=mysql.createPool({
	host:"127.0.0.1",//localhost
	user:"root",//用户名
	password:"",//密码
	database:"tianfang",//数据库
	port:"3306"
});

router.post("/system",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
		pool.query('SELECT * from system',function(err,rows,fields){
		if(err) throw err;
		res.send(rows);
	});

});

router.post("/xiangqing3",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
     var id=req.body["id"];
     console.log(id);
	pool.query(`SELECT * from system where id=${id}`,function(err,rows){
          if(err) throw err;
          res.send(rows)
	});
})


module.exports=router;