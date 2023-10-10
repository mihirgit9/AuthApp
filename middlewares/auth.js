require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_key;

exports.auth = (req, res, next)=>{
    const token = req.body.token || req.cookie.token ;

    if(!token || token===undefined){
        return(
            res.status(401).json({
                success:false,
                message:'token missing'
            })
        )
    }

    try{

        const payload = jwt.verify(token, jwt_key);
        req.payload = payload;
    } catch(err){
        return(
            res.status(401).json({
                success:false,
                message:"Invalid! Could not verify token"
            })
        )
    }
    next();
}