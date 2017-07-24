var express=require('express');
var mysql=require('mysql');
var router=express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件

var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'xiebin',
	port:3306
})



router.post('/img',function(req,res){
	res.header("Access-Control-Allow-Origin", "*"); //跨域
	var form = new formidable.IncomingForm();
	form.uploadDir='public/upload';
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
			var newPath='public/upload/'+fName;  //要返回的图片的路径
			fs.renameSync(file.path,newPath);
			 // res.send(fName)
		}
		pool.query(`insert into user(img) values('http://localhost:8005/upload/${fName}')`,function(err,rows){
			if (err) throw err;
			if(rows){
				res.send('上传成功')
			}
			
		})
		
	})
	});


//调取图片
router.get('/photo',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select * from user',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})
module.exports=router;