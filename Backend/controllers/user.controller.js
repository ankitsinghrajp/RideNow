const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklistToken.model');


const userService = require('../services/user.service');

const {validationResult} = require('express-validator');


module.exports.registerUser = async (req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password} = req.body;

    const checkUser = await userModel.findOne({email});
    if(checkUser){
        return res.status(400).json({message:"This email is already register with us try login!"});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = await user.generateAuthToken();

   return res.status(201).json({token,user});
}

module.exports.loginUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;
    if(!email || !password) return res.status(400).json({message: "All fields are required"});

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        res.status(401).json({message: "Invalid email or password!"});
    }

    // Check if the password is correct or not 

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"})
    }

    const token = user.generateAuthToken();

    res.cookie('token',token);

    return res.status(200).json({message: "Login successfull",user,token})
}

module.exports.getUserProfile = async(req,res,next)=>{

      res.status(200).json(req.user);
}

module.exports.logoutUser = async (req,res,next)=>{
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.status(200).json({message:"Logged out"});
}