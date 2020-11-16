const express=require("express");
const router =express.Router();
const bodyparser=require("body-parser");
const key =require("../../setup/connect").TOKEN_KEY;
const collegeController = require("../../controllers/college")
// const tokenHelper = require("../../helpers/sessionVerfiy")

// @type    POST
//@route    /api/college/add
// @desc     route for adding college
// @access  PRAVITE 

router.post("/add",collegeController.add)

// @type    GET
//@route    /api/college/add
// @desc    route for getting college details
// @access  PRAVITE

router.get("/all_colleges",collegeController.allColleges)

// @type    POST
//@route    /api/college/add
// @desc    route for getting college details
// @access  PRAVITE

router.post("/all_colleges",collegeController.getCollegeWithStudent)

// @type    POST
//@route    /api/college/add
// @desc    route for getting college details
// @access  PRAVITE

router.get("/state-colleges",collegeController.stateColleges)

// @type    POST
//@route    /api/college/add
// @desc    route for getting college details
// @access  PRAVITE

router.get("/courses-colleges",collegeController.coursesColleges)

// @type    POST
//@route    /api/college/add
// @desc    route for getting college details
// @access  PRAVITE

router.post("/getcolleges",collegeController.getColleges)


module.exports =router;