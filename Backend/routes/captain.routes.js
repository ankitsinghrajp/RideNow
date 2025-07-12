const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware')



router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage("First name must be atleast 3 characters long"),
    body('password').isLength({min:8}).withMessage("Password must be atleast 8 characters long"),
    body('vehicle.color').isLength({min:3}).withMessage("Color must be atleast 3 characters long"),
    body('vehicle.plate').isLength({min:3}).withMessage("Plate must be atleast 3 characters"),
    body("vehicle.capacity").isLength({min:1}).withMessage("Capacity must be atleast 1f"),
    body("vehicle.vehicleType").isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type')
], captainController.registerCaptain);

router.post('/login',[
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min:8}).withMessage("Password must be atleast 8 characters long.")
], captainController.loginCaptain);

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);

router.get('/logout',captainController.logoutCaptain);

module.exports = router;