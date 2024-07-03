const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const { default: mongoose } = require('mongoose');


//capture the payment and initiate the Razor payorder 

exports.capturePayment = async(req,res) =>{
    try {
        //get course id and user id 
        const {course_id} = req.body
        const {userId} = req.user.id
        //validation for the data
        if(!userId){
            return res.json({
                message:'Please provide valid course id',
            })
        } 
        let course;
        try {
            course = await Course.findById(course_id);
            if(!course){
                return res.json({
                    message:"could not find the course",
                })
            }
            // check for if user have paid for it or not 
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEntrolled.includes(uid)){
                return res.json({
                    message:"the student is already enrolled"
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:error.message,
            })
        }
        
        //create order and send response 
        const amount = course.price;
        const currency ="INR";
        const options={
            amount:amount*100,
            currency,
            recipt:Math.random(Date.now()).toString(),
            notes:{
                courseId:course_id,
                userId,
            }
        };
        try {
            //init the payment 
            const paymentResponse=await instance.orders.create(options);
            console.log(paymentRes);
        } catch (error) {
            return res.status(500).json({
                message:"payment can't be inint",
            })
        }
        return res.status(200).json({
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:"Could not Initiate order"
        })       
    }
}


//verify Signature of razorpay and server 

exports.verifySignature = async(req,res) =>{
    const webHookSecret = "7217636219";
    const signature = req.headers["x-razorpay-signature"];

    const shasum =crypto.createHmac("sha265",webHookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex")

    if(signature === digest){
        console.log("Payment is Authorised");
        
    }
}