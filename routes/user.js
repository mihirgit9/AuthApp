const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");
const login = require("../controllers/login");

router.post("/login", login);


//protected route
router.get("/Student", auth, (req, res)=>{
    payload = req.payload;
    return(res.json({
        success:true,
        payload,
        message:"welcome to the protected route of student"
    }))
})

module.exports=router;