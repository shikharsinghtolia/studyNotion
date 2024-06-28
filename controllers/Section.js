const Section = require("../models/Section");
const Course = require("../models/Course");

//create
exports.createSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body;
    //data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        message: "missing properties",
      });
    }
    //create section
    const newSection = await Section.create({ sectionName });
    //update in course Schema
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    ).populate({
      path:'SubSection',
      model:'SubSection'
    });
    //use populate to replace section/subsection both in updatedCourse Details
    //return res
    return res.status(200).json({
      message: "Section created SucessFully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `An error occured during Section creation:${error}`,
    });
  }
};

//update Section

exports.updateSection = async (req, res) => {
  try {
    //data input
    const { sectionName, sectionId } = req.body;

    //data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        message: "missing properties",
      });
    }
    //update data
    const Section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    //return res
    return res.status(200).json({
      message: "Section updated  ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `An error occured during Section updation:${error}`,
    });
  }
};

//delete

exports.deleteSection = async (req, res) => {
  try {
    //fetch data Assuming that we are sending id in prams
    const { sectionId } = req.prams;
    //findbyId and Delete
    await Section.findByIdAndDelete(sectionId);
    //return res
    return res.status(200).json({
      message: "Section deleted Sucessfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `An error occured during Section Deletion:${error}`,
    });
  }
};
