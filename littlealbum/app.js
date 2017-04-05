var express=require("express");
var app=express();
var router=require("./controller/router");
app.set("view engine","ejs");
//路由中间件
app.use(express.static("./public"));
app.use(express.static("./uploads"));
app.get('/',router.showIndex);
app.get("/up",router.showUp);
app.get("/:albumName",router.showAlbum);
app.post("/up",router.dopost);

//404
app.use(function(req,res){
	res.render("404");
	
	
 });
app.listen(3000);
