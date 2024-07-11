const express = require('express');
const userModel = require('./userModel');
const app = express();

app.get('/', (req,res) =>{
    
    res.send("hey");
})

app.get('/create',async(req,res)=>{
        let createdUser = await userModel.create({
        name:"harsh",
        email:"anchal1810sh@gmail.com",
        userName:"anchal" 
       })
        res.send(createdUser)
})

app.get('/update',async(req,res)=>{
    let updatedUser = await userModel.findOneAndUpdate(
        {userName:"anchal"},
        {name:"harshta"},
        {new:true})
        res.send(updatedUser)
})
app.get('/read',async(req,res)=>{
    let users = await userModel.find();
    res.send(users);
})

app.get('/delete',async(req,res)=>{
    let users = await userModel.findOneAndDelete({userName :"anchal"});
    res.send(users);
})
app.listen(5000);