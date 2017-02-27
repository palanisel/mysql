var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql=require('mysql')
var pg = require('pg');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sample'
});

app.get('/',function(req,res,next){
res.sendfile('index.html');
});

app.post('/myaction', function(req, res) {

console.log('req.body');
console.log(req.body);
res.write('Your name "' + req.body.name+'".\n');
res.write('Your Reg.no "' + req.body.reg+'".\n');
res.write('Your course"' + req.body.course+'".\n');
res.end()

connection.query("Insert into task1 (name,reg_no,course) VALUES ('"+req.body.name+"','"+req.body.reg+"','"+req.body.course+"')",function(err, result)      
{                                                      
  if (err)
     throw err;
});
});
app.listen(8080);
console.log('Example app listening at port:8080');

