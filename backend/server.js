const express=require('express');
const dotenv=require('dotenv');
const connectDB = require('./config/db');

const app=express();

dotenv.config();
connectDB();
app.get('/', function(req, res) {
    res.send("Hello");
});
app.listen(5000,()=>{
    console.log("Server started at port 5000");
});