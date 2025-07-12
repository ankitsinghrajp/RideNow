const captainModel = require('../models/captain.model');
const userModel = require('../models/user.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');


module.exports.registerCaptain = async (req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }

    const {fullname,email,password,vehicle} = req.body;

    const checkCaptain = await userModel.findOne({email});
    if(checkCaptain){
        res.status(400).json({
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