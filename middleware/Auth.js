const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
//auth 
exports.auth = async(req,res,next)=>{
    try {
        //extract token 
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer","");
        if(!token){
            return res.status(404).json({
                message:"Token is missing",
            })
        }
        //verify token 
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;

        } catch (error) {
            //if isssue
            return res.status(401).json({
                message:"issue with token ",
                error,
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message:"Somthing went wrong while validating the token ",
            error
        })
    }

}
//isStudent 

exports.isStudent = async (req,res,next)=>{
    try {
        if(req.user.accountType !=="Student"){
            return res.status(401).json({
                message:"this is a protected route",
            })
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:"Somthing went wrong while validating user Role ",
            error
        })
    }
}

//isInstructor
exports.isInstructor = async (req,res,next)=>{
    try {
        if(req.user.accountType !=="Instructor"){
            return res.status(401).json({
                message:"this is a protected route",
            })
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:"Somthing went wrong while validating user Role ",
            error
        })
    }
}
//isAdmin 

exports.isAdmin = async (req,res,next)=>{
    try {
        if(req.user.accountType !=="Admin"){
            return res.status(401).json({
                message:"this is a protected route",
            })
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:"Somthing went wrong while validating user Role ",
            error
        })
    }
}