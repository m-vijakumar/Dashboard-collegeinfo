const Students = require("../models/Student")

exports.add = async(req,res) =>{

    const {name ,collegeId,yearofjoin,skills} = req.body;

    let student = new Students({
        name : name,
        collegeId :collegeId,
        yearOfJoin:yearofjoin,
        skills :skills,
        createdOn:Date.now()
    }) 
    await student.save()
                .then(()=>{
                    res.json({
                        error:false,
                        msg:"Student Added"
                    })
                })
                .catch((err)=>{
                    res.json({
                        error:true,
                        msg:"internal Error...!"
                    })
                })

};


exports.getCollegeStudents = async(req,res)=>{

    const {collegeId} = req.body;

    await Students.find({collegeId:collegeId})
                .then((result)=>{
                    console.log(result)
                    res.json({
                        error:false,
                        data:result
                    })
                }).catch((err)=>{
                    res.json({
                        error:true,
                        msg:"err  :"+err
                    })
                })

}

exports.getStudent = async(req,res)=>{

    const {collegeId,studentId} = req.body;

    await Students.findOne({collegeId:collegeId,_id:studentId})
                .then((result)=>{
                    console.log(result)
                    res.json({
                        error:false,
                        data:result
                    })
                }).catch((err)=>{
                    res.json({
                        error:true,
                        msg:"err  :"+err
                    })
                })

}