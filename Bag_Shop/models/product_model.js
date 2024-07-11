const mongoose= require("mongoose");
const productSchema =mongoose.Schema({
    image:String,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0
    },
    bgcolor: String,
    panelcolor: String,
    textColor:String
});

module.exports= mongoose.model("products",productSchema);