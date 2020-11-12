const mongoose =require("mongoose");
const Colleges = require('./Colleges');

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

StudentSchema.pre('save', async function(next) {

    var student = this;

    console.log(student.collegeId)
    await Colleges.findOneAndUpdate({_id:student.collegeId},{$inc :{noofstudents:1}},{new:true})
                    .then((result)=>{
                        if (result) {
                            console.log(result)
                            next();
                        }else{
                            throw err;
                        }
                    })
                    .catch((err)=>{
                        return next(err);
                    })
                    
    
});

const Students = module.exports  = mongoose.model("students",StudentSchema);