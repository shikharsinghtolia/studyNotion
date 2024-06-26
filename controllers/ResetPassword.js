const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
// ResetPassword token generation and mail sending
exports.resetPasswordToken = async (req, res) => {
  try {
    //get email from req body
    const userEmail = req.body.email;
    //check user for this email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "your email is not registered with us",
      });
    }
    //generate token
    const token = crypto.randomUUID();
    //update user by adding token and expirate time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token },
      { resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    //generate link
    const url = `https://localhost:3000/update-password/${token}`;

    //send mail containing the url

    await mailSender(
      email,
      "Reset Password Link",
      `Password Reset Link :${url}`
    );

    return res.json({
      message: "Email sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: " something went wrong while reseting the password ",
      error,
    });
  }
};

//resetPassword

exports.resetPassword = async (req, res) => {
  try {
    // fetch token old pwd and new pwd and confrim pwd
    const { password, confirmpassword, token } = req.body;
    //validation
    if (password !== confirmpassword) {
      return res.json({
        sucess: false,
        message: "match to krle password yrr",
      });
    }
    //get userDetails form db using token
    const userDetails = await User.findOne({ token: token });
    //if no entry invalid
    if (!userDetails) {
      return res.json({
        message: "token invalid",
      });
    }
    //token time check
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        message: "Token has been expired ",
      });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //update in Db
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    return res.json({
      message: "Password reset sucessfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occured during Reseting the password",
    });
  }
};
