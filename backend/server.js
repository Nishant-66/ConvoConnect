const express=require('express');
const dotenv=require('dotenv');
const connectDB = require('./config/db');
const userRoutes=require('./routes/userRoutes')

const app=express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();
app.get('/', function(req, res) {
    res.send("Hello");
});
app.use('/api/user',userRoutes);
app.listen(5000,()=>{
    console.log("Server started at port 5000");
});