const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("MongoDB connected successfully");
    }).catch((err)=>{
        console.log("There is error in connecting with MONGODB");
    })
}

module.exports = connectDB;