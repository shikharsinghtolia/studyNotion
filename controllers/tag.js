const Tag = require("../models/Tags");

exports.createTag = async(req,res)=>{
    try {
        //exrtact the data from req
        const {name,description} = req.body;

        //validation 
        if(!name|| !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }
        //create entry db
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        })
        console.log(tagDetails)
        return res.status(200).json({
            message:"Tag bangaya "
        })
    } catch (error) {
        return res.status(500).json({
            success:fail,
            message:error.message,
        })
    }
}


//get all tags 

exports.showAlltags = async (req,res)=>{
    try {
        const allTags = await Tag.find({},{name:true},{description:true});
        res.status(200).json({
            success:true,
            message:"all tags here",
            allTags
        })
    } catch (error) {
        return res.status(500).json({
            success:fail,
            message:error.message,
        })
    }
}