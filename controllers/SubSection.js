const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const uploadImageToCloudinary = require("../utils/imageUploader");
//create SubSection

exports.createSubSection = async (req, res) => {
  try {
    //fetch the data from req.body
    const { sectionId, title, timeDuration, description } = req.body;
    //extract file/video
    const videoFile = req.files.videoFile;
    //validation
    if (!sectionId || !title || !timeDuration || !description) {
      return res.status(400).json({
        message: "All field must be filled",
      });
    }
    //upload video to cloud
    const videoUpload = await uploadImageToCloudinary(
      videoFile,
      process.env.FOLDER_NAME
    );

    // create a subsection
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: videoUpload.secure_url,
    });
    // update section with the subsection ojectiD
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubSectionDetails._id } },
      {new:true},
    );
    //log updated Section here after adding populate query 
    //return response
    return res.status(200).json({
      message: "SubSection created SucessFully",
    });
    //
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `An error occured during SubSection creation:${error}`,
    });
  }
};


//UpdateSubSection 
exports.updateSubSection = async (req,res)=>{
    try {
        const {subSectionName,subSectionId} = req.body
        if(!subSectionName || !subSectionId){
            return res.status(400).json({
                message: "missing properties",
              });
        }
        const subSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            {subSectionName},
            {new:true}
        );
        return res.status(200).json({
            message: "Section updated  ",
          });

    } catch (error) {
        console.log(error);
    return res.status(500).json({
      message: `An error occured during Sub-Section updation:${error}`,
    });
        
    }
}

//DeleteSubSection 

exports.deleteSubSection = async (req,res )=>{
    try{
        const {subSectionId} = req.prams;

        await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            message: "Sub Section deleted Sucessfully",
          });
    }catch(error){
        console.log(error);
    return res.status(500).json({
      message: `An error occured during Sub-Section Deletion:${error}`,
    });
    }
}