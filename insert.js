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
  database : 'paramu'
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
var insert=req.body.insert;
var update=req.body.update;
var del=req.body.delete;
if(insert)
{
connection.query("Insert into task (name,reg_no,course) VALUES ('"+req.body.name+"','"+req.body.reg+"','"+req.body.course+"')",function(err, result)      
{                                                      
  if (err)
     throw err;
});
}
else if(update)
{
connection.query("UPDATE `task` SET `name`='"+req.body.name+"',course='"+req.body.course+"'  where `reg_no`='"+req.body.reg+"' ",function(err, result)	
{                                                      
  if (err)
     throw err;
});
}
else if(del)
{
connection.query("DELETE from `task`  where `reg_no`='"+req.body.reg+"' ",function(err, result)	
{                                                      
  if (err)
     throw err;
});
}
});
app.listen(8080);
console.log('Example app listening at port:8080');

