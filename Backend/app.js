const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

const connectDB = require('./db/db')
const userRoutes = require('../Backend/routes/user.routes');


connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("This is the backend of flow of RideNow");
})

app.use('/users',userRoutes);


module.exports = app;