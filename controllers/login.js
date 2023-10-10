const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_key = process.env.JWT_key;


const login = async(req, res)=> {
    try{
        //data entered by the user is fetched
        const {email, password} = req.body;
        if(!email || !password){
            return(
                res.status(400).json({
                    success:false,
                    message:"Enter the details properly"
                })
            )
        }

        //check if the user is registered or not
        const user = await User.findOne({email});
        if(!user){
            return(
                res.status(400).json({
                    success:false,
                    message:"User Not registered"
                })
            )
        }

        if(await bcrypt.compare(password, user.password)){    //password match ho gya
            const payload ={
                email:user.email,
                id:user.id,
                role:user.role
            }
            const token = jwt.sign(payload, jwt_key, {expiresIn:"2h"});
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options ={
                expires: new Date(Date.now() + 2*60*60*1000),
                httpOnly:true
            }

            return(
                res.cookie("token", token, options).status(201).json({
                    success:true,
                    user,
                    token,
                    message: "Logged in successfully"
                })
            )
        }
        else{                          //password match nhi hua
            return(
                res.status(400).json({
                    success:false,
                    message:"Password is )incorrect"
                })

            )
        }
    } catch(err){
        return(
            res.status(500).json({
                success:false,
                message:"Server failed to login"
            })
        )
    }
}

module.exports = login;