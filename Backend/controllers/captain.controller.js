const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');


module.exports.registerCaptain = async (req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }

    const {fullname,email,password,vehicle} = req.body;

    const checkCaptain = await captainModel.findOne({email});
    if(checkCaptain){
        return res.status(400).json({
            message:"This email is already registered with us. Try Login!"
        })
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })


    const token = captain.generateAuthToken();

    res.status(201).json({
        captain,
        token
    })
}

module.exports.loginCaptain = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({message:"All fields are required!"});
    }

    const captain = await captainModel.findOne({email}).select("+password");
    if(!captain){
        res.status(401).json({message:"This email is not registered with us. Try Login!"})
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid email or password"});
    }
      const token = captain.generateAuthToken();
      res.cookie('token',token);
    return res.status(201).json({message:"User login successfull",captain,token})
}

module.exports.getCaptainProfile = async (req,res,next)=>{
    return res.status(200).json({captain: req.captain});
}

module.exports.logoutCaptain = async (req,res,next)=>{
   
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({token});

     res.clearCookie('token');

    res.status(200).json({message: "Logged out"});

}