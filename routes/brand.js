var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var imgs
var config="http://localhost:8100/";
var pool=require("./../config.js");

router.post("/brand",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");

	
		pool.query('SELECT * from brand',function(err,rows,fields){
		if(err) throw err;
		res.send(rows);
	});

});

router.post('/upprize',function(req,res){
	var id=req.body["id"]
	var title=req.body["title"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update brans set  title="${title}" where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})
router.post('/dlcases1',function(req,res){
	var id=req.body["id"]
	var title=req.body["title"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`delete from brans where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("删除成功")
	});
})

//图片
router.post('/incases1',function(req,res){
	res.header("Access-Control-Allow-Origin", "*"); //跨域
	var form = new formidable.IncomingForm();
	form.uploadDir='public/images';
	  //上传图片存放的路径
	form.parse(req,function(error,fields,files){
		for(var i in files){
			var file = files[i];  //保存图片属性
			var fName = (new Date()).getTime()  //用一时间戳作为图片的名字
			switch(file.type){    //检测图片的格式
				case "image/jpeg":
				fName=fName+".jpg";
				break;
				case "image/png":
				fName=fName+".png";
				break;
				case "image/gif":
				fName=fName+".gif";

			}
			var newPath='public/images/'+fName;  //要返回的图片的路径
			fs.renameSync(file.path,newPath);
			  res.send(newPath)
		}
		imgs=`${config}images/${fName}`
	})
	});
//调取图片
router.post('/alcases1',function(req,res){
	var id=req.body["id"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update brand set  img="${imgs}" where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})
module.exports=router;
