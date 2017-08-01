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

router.post("/cont",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
		pool.query('SELECT * from cont',function(err,rows,fields){
		if(err) throw err;
		res.send(rows);
	});

});
router.post('/upcont',function(req,res){
	var id=req.body["id"]
	var title=req.body["title"]
	var eng=req.body["eng"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update cont set  title="${title}" , eng="${eng}" where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})

router.post('/dlcases2',function(req,res){
	var id=req.body["id"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`delete from cont where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("删除成功")
	});
})
module.exports=router;