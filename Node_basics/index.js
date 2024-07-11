const fs =require('fs');

// fs.writeFile('hey.txt',"hri OMM, Stay Happy", function(err){
//     if(err) console.log(err);
//     else console.log("done");
// })
// fs.appendFile('hey.txt',"Take care of yourself", function(err){
//     if(err) console.log(err);
//     else console.log("done");
// })
// fs.rename('hey.txt',"hlo.txt", function(err){
//     if(err) console.log(err);
//     else console.log("done");
// })
// fs.copyFile("hey.txt","./copy/new.txt",function(err){
//     if(err) console.log(err.message);
//     else console.log("done");
// })
// fs.unlink("hey.txt",function(err){
//     if(err) console.log(err);
//     else console.log('done');
// })
// fs.rmdir("./del",{recursive:true} function(err){
//     if(err)console.log(err);
//     else console.log("removed");
// })

const http = require('http');
const server = http.createServer(function(req,res){
    res.end("hello world");
})
server.listen(3000)