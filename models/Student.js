const mongoose =require("mongoose");
const bcrypt = require('bcryptjs');

const  Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name:{
        type: String,
        require:true
    },
    yearOfJoin:{
        type: String,
        require:true
    },
    collegeId:{
        type: Schema.Types.ObjectId,
        ref: 'colleges',
    },
    skills:[
        {
            type:String 
        }
    ]
    
})

const Students = module.exports  = mongoose.model("students",StudentSchema);