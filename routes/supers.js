var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var imgs
var config="http://localhost:8100/";
var pool=mysql.createPool({
	host:"127.0.0.1",//localhost
	user:"root",//用户名
	password:"",//密码
	database:"tianfang",//数据库
	port:"3306"
});

//插入图片
router.post('/super_file',function(req,res){
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

router.post('/super_files',function(req,res){
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
		imgs=`${fName}`
	})
});

router.post("/supers",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
		pool.query('SELECT * from supers',function(err,rows,fields){
		if(err) throw err;
		res.send(rows);
	});

});
router.post("/xiangqing4",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
     var id=req.body["id"];
     console.log(id);
	pool.query(`SELECT * from supers where id=${id}`,function(err,rows){
          if(err) throw err;
          res.send(rows)
	});
})
router.post('/upsupers',function(req,res){
	var id=req.body["id"]
	var title=req.body["title"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`update supers set super_word="${title}" where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})

router.post('/upsuperss',function(req,res){
	var id=req.body["id"]
	var title=req.body["title"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`update supers set con="${title}" where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})

router.post('/upsuper_img',function(req,res){
	var id=req.body["id"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`update supers set  super_img="${imgs}" where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})

router.post('/upsuper_imgs',function(req,res){
	var id=req.body["id"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`update supers set  more="${imgs}" where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})

router.post('/dlcases_supers',function(req,res){
	var id=req.body["id"]
	var title=req.body["title"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`delete from supers where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("删除成功")
	});
})

module.exports=router;