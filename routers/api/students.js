const express=require("express");
const router =express.Router();
const bodyparser=require("body-parser");
const key =require("../../setup/connect").TOKEN_KEY;
const studentController = require("../../controllers/student")
// const tokenHelper = require("../../helpers/sessionVerfiy")

// @type    POST
//@route    /api/student/add
// @desc     route for adding student
// @access  PRAVITE 

router.post("/add",studentController.add)

// @type    POST
//@route    /api/student/add
// @desc    route for getting student details
// @access  PRAVITE 


// router.post("/student",studentController.getDetails)

// @type    POST
//@route    /api/student/add
// @desc    route for getting student details
// @access  PRAVITE 

router.post("/college_students",studentController.getCollegeStudents)

// @type    POST
//@route    /api/student/add
// @desc    route for getting student details
// @access  PRAVITE 

router.post("/getstudent",studentController.getStudent)


module.exports =router;