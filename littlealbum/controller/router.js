//首页
var file=require("../models/file.js");
var formidable=require("formidable");
var path=require("path");
var fs=require("fs");
var sd=require("silly-datetime");

exports.showIndex=function(req,res){
	//这就是nodejs的编程思维，就是所有的东西都是异步的
	//所有内层函数不是return回来的东西，而是通过调用高层函数
	//提供的回调函数，把数据当做回调函数的参数来使用 
	file.getAllAlbums(function(allAlbums){
	   res.render("index",{
	  "albums":allAlbums
			   });
	
	})
	
}
//相册页
exports.showAlbum=function showAlbum(req,res){
	var albumName=req.params.albumName;
	file.getAllImagesByAllbumName(albumName,function(err,imagesArray){
		if(err){
			res.send(err);
			return;
		}
		 res.render("album",{
	    "albumName":albumName,
		"images":imagesArray
			   }); 
	  });
	
	
}
//显示上传
exports.showUp=function(req,res){
	 file.getAllAlbums(function(allAlbums){
		res.render("up",{
			"albums":allAlbums
				   });
	});
}
//提交图片
exports.dopost=function(req,res){
	var form=new formidable.IncomingForm();
	form.uploadDir=path.normalize(__dirname+"/../uploads/");
	form.parse(req,function(err,fields,files,next){
		if(err){
			next();
			return;
		}
		var ttt=sd.format(new Date(),'YYYYMMDDHHmmss');
		var ran=parseInt(Math.random()*8999+10000);
		var extname=path.extname(files.tupian.name);
			//执行改名
		var oldpath=files.tupian.path;
		var wenjianjia=fields.wenjianjia;
		var newpath=path.normalize(__dirname+"/../uploads/"+wenjianjia+"/"+ttt+ran+extname);
		fs.rename(oldpath,newpath,function(err){
			if(err){
				res.send("改名失败");
			}
			
		});
		
		});
	res.send("成功");
}
	
	