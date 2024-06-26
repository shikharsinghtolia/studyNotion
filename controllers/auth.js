const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const JWT = require("jsonwebtoken");
require('dotenv').config();

//send OTP

exports.sendOTP = async (req, res) => {
  try {
    // Email from req body
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        sucess: false,
        message: "User already exists",
      });
    }
    //otp generator
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP Generated", otp);

    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };
    //db entry of otp
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "OTP send",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//SIgnUp

exports.signUp = async (req, res) => {
  //data fetch
  //validtaion
  //check both the password
  //check if user alredy here or not
  // send otp
  //validate the otp
  //hash the password
  //create entry
  //response return
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      acountType,
      contactNumber,
      otp,
    } = req.body;

    //validation of req data
    if (!firstName || !lastName || !password || !confirmPassword || !otp) {
      return res.status(403).json({
        sucess: false,
        message: "Fill all fields are required",
      });
    }
    //2 password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and ConfirmPassword does not match ",
      });
    }
    //check user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        sucess: false,
        message: "User is already registered",
      });
    }
    //fined the most recent otp stored for the user
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);
    //validate OTP
    if (recentOtp.length == 0) {
      return res.status(400).json({
        sucess: false,
        message: "otp not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(400).json({
        sucess: false,
        message: "otp not match",
      });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //entry create DB

    const ProfileDetails = await Profile.create({
      genter: null,
      dateofBirth: null,
      about: null,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword,
      acountType,
      contactNumber,
      otp,
      additionalDetails: ProfileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
        sucess:true,
        message:"user is registered",
        user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user is cant be registered",
      message: `error is tihs${error}`
    });
  }
};


//Login 

exports.login = async (req,res) => {
    try{
        //fetch the details from req
        const {email,password} = req.body;
        //validate this check in from DB 
        if(!email || !password){
            return res.status(403).json({
                message:"Fill all the required fields"
            })
        }
        //check if user exists 
        const user = await User.findOne({
            email
        })
        if(!user){
            return res.status(401).json({
                message:"user is not registered,signup first",
            })
        }
        //password match
        if(await bcrypt.compare(password,user.password)){
            const payload ={
                email:user.email,
                id:user._id,
                role:user.role
            }
            //generate JWT
            const token= JWT.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;

        
        const options = {
            expires: new Date(Date.now()+3*24*60*100),
            httpOnly:true,
        }
        //create cookie 
        res.cookie("token",token,options).status(200).json({
            token,
            user,
            message:"logged in"
        })
    }else{
        return res.status(401).json({
            message:"password does not match"
        })
    }

    }catch(error){
        console.log(error);
        return res.status(400).json({
            sucess:false,
            message:"invalid id and password",
            message:`error is this ${error}`
        })
    }
}