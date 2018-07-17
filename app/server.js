/* 
 *Author: Andrew Soback, Taylor Jones
 *CS340
 *Meal Wheel Database Class Project
 */

var express = require("express");
var app = express();

app.set('port', 31000);
//app.use(express.static('public'));

app.get('/',function(req,res,next){
    res.redirect('public/index.html');
});

app.post('/', function(req, res){
 res.redirect('public/index.html');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
