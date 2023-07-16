// ***************************************************Dependencies************************************************* 
//Packages 
const  mongoose  = require('mongoose');
const async = require('async');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
//Models
const User=require('../models/userModel');

//middelwares
const upload = require("../middelwares/multer");
//Token
const jwt = require('jsonwebtoken');
const fs = require('fs');


const signUp = async (req, res) => {
    
    if (!req.body.email || !req.body.password) {
      res.status(403).json({
        success: false,
        message: 'Please enter your email or your password',
      });
    } else {
      try {
        let newUser = new User();
        const saltRounds = 6;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        if(req.body.confirmPassword==req.body.password){
        newUser.confirmPassword=hashedPassword
        newUser.email = req.body.email;
        newUser.password = hashedPassword;
        newUser.first_name = req.body.first_name;
        newUser.last_name = req.body.last_name;
        newUser.phone_number = req.body.phone_number;
        if (req.files && req.files.image) {
          // If a new image is provided, update the imagePath
          const imagePath = `${req.protocol}://${req.get("host")}/uploads/${
            req.files.image[0].filename
          }`;
          newUser.image = imagePath;
        }
  
        await newUser.save();
        res.status(200).json({
          success: true,
          message: "You have successfully signed up! Please check your email",
        });
        }else{
            res.status(404).json({
                success: false,
                message: 'Please confirm your password',
              });
        }
       
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
  };
  

module.exports={
      signUp,

}
