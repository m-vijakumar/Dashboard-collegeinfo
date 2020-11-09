const mongoose =require("mongoose");
const bcrypt = require('bcryptjs');


const  Schema = mongoose.Schema;
const userSchema = new Schema({
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
        require:true
    },
    courses:[{
        name:{
            type: String,
            require:true
        }
    }],
    date:{
        type:Date,
        default :Date.now
    }
})