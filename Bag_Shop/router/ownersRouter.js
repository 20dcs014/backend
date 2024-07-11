const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner_model");

console.log(process.env.NODE_ENV);

router.get("/",function(req,res){
    res.send("hey it is working");
});
if(process.env.NODE_ENV === "development"){
    router.post("/create",function(req,res){
        res.send("Working woaahhh")
    })
}
module.exports =router;