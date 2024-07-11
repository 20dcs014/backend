const express = require('express');
const app = express();
const userModel = require("./models/user")
const postModel = require("./models/post")
app.get("/",function(req,res){
    res.send("hey");
})

app.get("/create",async function(req,res){
    let user = await userModel.create({
        username:"anchal",
        age:25,
        email:"anchal1810sh@gmail.com"
    });
    res.send(user);
})

app.get("/post/create",async function(req,res){
    let post = await postModel.create({
        postdata:"Love yourself",
        user:"667a8b92e63d25af99650298"

    })
    let user = await userModel.findOne({_id :"667a8b92e63d25af99650298"});
    user.posts.push(post._id);
    await user.save();
    res.send({post,user});
})

app.listen(3000);