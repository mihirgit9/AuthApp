const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.signup = async(req, res)=>{
    try{
        //fetch data
        const {name, email, password, role} = req.body;
        //check if already registered
        const user = await User.findOne({email});

        if(user){
            return(
                res.status(500).json({
                    success:false,
                    message:"User already registered with this email"
                })
            )
        }

        try{       //hashing password
            var hashedPassword = await bcrypt.hash(password, 10);
        } catch(err){
            return(
                res.status(500).json({
                    success:false,
                    message:"Error in hashing password"
                })
            )
        }

        const newUser = await User.create({
            name, email, password:hashedPassword, role
        });

        const payload = {
            email:email,
            id:newUser.id,
            role:role
        }

        const token = jwt.sign(payload, process.env.JWT_key, {expiresIn:"2h"});
        newUser.password = undefined;
        newUser.token = token;

        return(
            res.status(201).json({
                success:true,
                token,
                newUser,
                message:"User Registered"
            })
        )

    } catch(err){
        res.status(401).json({
            success:false,
            message:"Could not create account. Try again!",
            error:err.message
        })
    }
}