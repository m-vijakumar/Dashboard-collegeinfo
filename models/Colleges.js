const mongoose =require("mongoose");
const bcrypt = require('bcryptjs');


const  Schema = mongoose.Schema;
const CollegeSchema = new Schema({
    name:{
        type: String,
        require:true
    },
    yearfounded:{
        type: String,
        require:true
    },
    city:{
        type: String,
        require:true
    },
    state:{
        type: String,
        require:true
    },
    country:{
        type: String,
        require:true
    },
    noofstudents:{
        type:Number,
        require:true,
        default : 0
    },
    courses:[{
            type: String,
            require:true
        }],
    date:{
        type:Date,
        default :Date.now
    }
})

const Colleges = module.exports  = mongoose.model("colleges",CollegeSchema);