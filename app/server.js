/* 
 *Author: Andrew Soback, Taylor Jones
 *CS340
 *Meal Wheel Database Class Project
 */

var express = require("express");
var app = express();

app.set('port', 31001);
//app.use("public", express.static('public'));
<<<<<<< HEAD
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
=======
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);
>>>>>>> d1de5513bf0d16ffdac74c38ede9e1fe009d9c07

app.get('/', function(req, res){
  res.redirect('/index.html');
});

app.post('/', function(req, res){
 res.redirect('index.html');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
