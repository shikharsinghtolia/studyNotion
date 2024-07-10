const Course = require("../models/Course");
const Tag = require("../models/Tags");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create course
exports.createCourse = async (req, res) => {
  try {
    //fetch data and file
    const { courseName, courseDescription, whatwillyouLearn, price, tag } =
      req.body;
    //thumbnail
    const thumbnail = req.files.thumbnailImage;
    //validate the data
    if (
      !courseName ||
      !courseDescription ||
      !whatwillyouLearn ||
      !price ||
      !tag ||
      !thumbnail
    ) {
      return res.satus(400).json({
        message: "All fields are required",
      });
    }
    //authentication of instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log("this is instructorDetails", instructorDetails);
    if (!instructorDetails) {
      return res.status(404).json({
        message: "not found details",
      });
    }
    //tags validation
    const tagDetails = await Tag.findById(tag);

    if (!tagDetails) {
      return res.status(404).json({
        message: "Tag not found",
      });
    }
    //image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //db entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatwillyouLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });
    //add the new course to user schema of instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "course created ",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "faild to create the course",
    });
  }
};

//update tag ka schema

//get All Courses

exports.getAllCourses = async (req, res) => {
  try {
    const AllCourses = await Course.find(
      {},
      {
        courseName,
        price,
        thumbnail,
        instructor,
        ratingAndReviews,
        studentsEntrolled,
      }
    )
      .populate("instructor")
      .exec();
    console.log(AllCourses);
    return res.status(200).json({
      message: "YEs All Courses Fetched  ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to process your request of showAllCourses",
    });
  }
};


//getCourseDetails

exports.getCourseDetails = async(req,res)=>{
  try {
    //fetch course id 
    const {courseId} = req.body;
    //find details of the course
    const courseDetails = await Course.find(
      {_id:courseId}
    )
    
    //populate 

  } catch (error) {
    
  }
}