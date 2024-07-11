const express =require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

const ownersRouter = require("./router/ownersRouter");
const productRouter = require("./router/productRouter");
const userRouter = require("./router/userRouter");



app.use("/owners",ownersRouter);
app.use("/users",userRouter);
app.use("/products",productRouter);

app.get("/",(req,res)=>{
    res.send("hey");
});
app.listen(3000);