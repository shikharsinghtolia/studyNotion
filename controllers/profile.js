const Profile = require("../models/Profile");
const User = require("../models/User");

//updateProfile 

exports.updateAccount = async(req,res)=>{
    try {
        //get data 
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;
        //get userId
        const id = req.user.id;
        //validation
        if(!contactNumber || !gender){
            return res.status(400).json({
                message:'all fileds are required',
            });
        }
        //find profile 
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        console.log( `this is profileDetails ${profileDetails} and this is profile id ${profileId}` ,)
        //update in db 
        await profileDetails.save;
        //return response
        return res.status(200).json({
            sucess:true,
            message:"Profile Updated",
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"profile Update unScessfull",
        })
    }
}


//delete profile

exports.deleteAccount  = async (req,res)=>{
    try {
        //get id 
        const id = req.user.id;
        // validation 
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                message:"user Not Found",
            })
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        // Unenroll user form all enrolled courses
        //delete user 
        await User.findByIdAndDelete({_id:id});
        //retrun response 
        return res.status(200).json({
            sucess:true,
            message:"Profile Deleted",
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"profile delete unScessfull",
        })
    }
}
// Unenroll user form all enrolled courses

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
