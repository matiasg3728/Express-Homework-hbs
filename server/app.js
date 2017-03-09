var express = require('express'),
	app     = express(),
	server  = require('http').createServer(app),
	path    = require('path'),
	bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
	extended: true
}));


var users = [];
var jUsers = {jsonArry:[]};
app.get('/register', function(req, res){
	res.render('register')
	console.log("/registerGet:done")
})
app.post('/register', function(req, res){
	var pusername ="" + req.body.username;
	var ppassword ="" + req.body.password;
	var nUser = {username:pusername, password:ppassword}
	var jsonUser = {"username":pusername, "password":ppassword}
	users.push(nUser);
	jUsers.jsonArry.push(jsonUser);
	res.redirect('/login')
	console.log(users)
	console.log("/registerPost:done")
})
app.get('/login', function(req, res){
	res.render('login')
	console.log("/loginGet:done")
})
app.post('/login', function(req, res){
	var pusername = req.body.username;
	var ppassword = req.body.password;
	var page ='login';
	for(i in users){
		if(users[i].username === pusername && users[i].password === ppassword){
			page='home'
			console.log("in for /login")
		}
	}
	res.render(page, jUsers)
	console.log("/loginPost:done")
})
app.get('/home', function(req, res){
	res.render('home', jUsers)
	console.log("/homeGet:done")
})


server.listen(3000, function(){
	console.log("On port 3000")
})