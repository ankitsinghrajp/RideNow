const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("This is the backend of flow of RideNow");
})


module.exports = app;