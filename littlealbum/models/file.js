var fs=require("fs");
exports.getAllAlbums=function(callback){
	fs.readdir("./uploads",function(err,files){
		var allAlbums=[];
		(function iterator(i){
						   
			if(i==files.length){
				callback(allAlbums);
				return;
			}
			fs.stat("./uploads/"+files[i],function(err,stats){
				if(stats.isDirectory()){
					allAlbums.push(files[i]);
				}
				iterator(i+1);
			});			   
		})(0);
	});
								
	}
	//通过文件名得到所有图片
exports.getAllImagesByAllbumName=function(albumName,callback){
	fs.readdir("./uploads/"+albumName,function(err,files){
		if(err){
			callback("没有找到文件",null);
			return;
		}
		var allImages=[];
		(function iterator(i){
			if(i==files.length){
				callback(null,allImages);
				return;
			}
			fs.stat("./uploads/"+albumName+"/"+files[i],function(err,stats){
				if(err){
			callback("找不到文件",null);
			return;
		    }
				if(stats.isFile()){
					allImages.push(files[i]);
				}
				iterator(i+1);
		 });
	})(0);
  });
}
			