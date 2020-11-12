const Colleges = require("../models/Colleges");
const Students = require("../models/Student")
const mongoose =require("mongoose");
exports.add = async(req,res) =>{

    const {name ,country,state,city,yearfounded} = req.body;

    let college = new Colleges({
        name : name,
        country :country,
        state:state,
        city :city,
        yearfounded :yearfounded,
        createdOn:Date.now()
    }) 
    await college.save()
    .then(()=>{
        res.json({
            error:false,
            msg:"College Added"
        })
    })
    .catch((err)=>{
        res.json({
            error:true,
            msg:"internal Error...!"
        })
    })

};

exports.allColleges = async(req,res)=>{
    
    // console.log(req.body.collegeId)
    await Colleges.aggregate([
                            // {
                            //     $match:{
                            //         _id:mongoose.Types.ObjectId(req.body.collegeId)
                            //     }
                            // },
                            { 
                                $lookup:{
                                    from:"students",
                                    localField:"_id",
                                    foreignField:"collegeId",
                                    as:"students" 
                                }
                            }
                            ])
    // await Colleges.findOne({"_id":req.body.collegeId}).populate('students')
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


exports.stateColleges = async(req,res)=>{

    Colleges.aggregate([
                    {
                        "$group" : {
                            _id:"$state",
                             count:{$sum:1}
                        }
                    }
                ])
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
   
exports.getColleges = async(req,res)=>{

    const {collegeName ,country,state,city,courses} = req.body;
    console.log(collegeName ,country,state,city,courses)

    await Colleges.find({ $or :
    [   {name:collegeName},
        {country:country},
        {state:state},
        {city:city},
        {courses:{ $in :courses}}
    ]
    })
    .then((result)=>{
        console.log("wergvwekutrvaewrkuvawuetrvawervawetvraetvraetwra")
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

exports.coursesColleges = async(req,res)=>{

    await Colleges.aggregate([
        // {$match: { class_date: { $gte: date } } },
        // {$project: { _id: 0, courses: 1 } },
        {$unwind: "$courses" },
        {$group: { _id: "$courses", count: { $sum: 1 } }},
        {$project: { _id: 0,course: "$_id", count: 1 } },
    ])
    .then((result)=>{
        console.log("wergvwekutrvaewrkuvawuetrvawervawetvraetvraetwra")
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