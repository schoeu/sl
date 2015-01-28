/**
 * Created by IAOC on 2015/1/28.
 */
var http = require('http');
var fs = require('fs');
var server = http.createServer();
server.on('request',function(req,res){
    //fs.readFile('../src/json')
    console.log(req.url[0].substring(3));
    res.write('callback111');
    res.end();
}).listen(10086);