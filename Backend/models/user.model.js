const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    fullName: {
        firstname: {
            type:String,
            required: true,
            minLength: [3,"The firstname must be atleast 3 characters long."],
            maxLength: [20,"The firstname must be less than or equal to 20 characters."]
        },
        lastname: {
            type:String,
            minLength: [3,"The lastname must be atleast 3 characters long."],
            maxLength: [20,"The lastname must be less than or equal to 20 characters."]
        }
    },
    email: {
        type:String,
        required: true,
        unique: true,
        minLength: [8,"The email must be atleast 8 characters long."]
    },
    password: {
        type:String,
        required:true,
    },
    socketId: {
        type: String,
    }

})