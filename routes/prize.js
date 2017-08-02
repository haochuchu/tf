var express=require("express");
var mysql=require("mysql");
var router=express.Router();
var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var imgs
var pool=mysql.createPool({
	host:"127.0.0.1",//localhost
	user:"root",//用户名
	password:"",//密码
	database:"tianfang",//数据库
	port:"3306"
});

router.post("/prize",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
		pool.query('SELECT * from prize',function(err,rows,fields){
		if(err) throw err;
		res.send(rows);
	});

});
router.post("/xiangqing2",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
     var id=req.body["id"];
     console.log(id);
	pool.query(`SELECT * from prize where id=${id}`,function(err,rows){
          if(err) throw err;
          res.send(rows)
	});
})

router.post('/upprizes',function(req,res){
	var id=req.body["id"]
	var title=req.body["title"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`update prize set prize_word="${title}" where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})
router.post('/dlcases8',function(req,res){
	var id=req.body["id"]
	var title=req.body["title"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`delete from prize where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("删除成功")
	});
})

router.post('/accases2',function(req,res){
	var text=req.body["text"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`insert into prize(prize_word,prize_img) values("${text}","${imgs}")`,function(err,rows){
			if (err) throw err;
			if(rows){
				res.send("上传成功")
			}
			
		})
})
//图片
router.post('/incases8',function(req,res){
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
		imgs=`http://localhost:8100/images/${fName}`
	})
	});
//调取图片
router.post('/alcases8',function(req,res){
	var id=req.body["id"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update prize set prize_img="${imgs}" where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})
module.exports=router;