const fs = require("fs");

module.exports = (app)=>{
	app.get("/",(req,res)=>{
		res.render("index.ejs",{names:[]});
	});
	app.post("/results",(req,res)=>{
		console.log(req.body);
		res.render("result.ejs",req.body);
	});
	app.post("/",(req,res)=>{
		fs.createWriteStream("./users.txt").write(req.body.name);
		let reader = fs.createReadStream("./users.txt");
		reader.setEncoding("utf8");
		let chunk = reader.read();
		let list = "";
		while(chunk != null) {
			list+=chunk+";";
			chunk = reader.read();
		}
		console.log(list);
		res.redirect("/",{names:[]});
	});
}