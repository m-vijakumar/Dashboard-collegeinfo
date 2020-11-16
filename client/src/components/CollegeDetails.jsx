import React, { useState } from 'react'
import {Alert , Button} from 'react-bootstrap'

function AlerdivismissibleExample(props) {
    const [show, setShow] = useState(false);
    const [students,setStudents]=useState([]);
    
    const getStudents = async(collegeId,e)=>{

        try{
            const response = await fetch('/api/students/college_students' , {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
    
                },
                mode:"cors",
                body :JSON.stringify({collegeId:collegeId})
            })
        
            const data = await response.json();
            console.log(data.data)
            if (data.error === false) {
                setStudents(data.data)
                setShow(true)

              } else {
            
                props.history.push("/404");
              }
              // console.log(data.data)
            }catch(err){
             
              props.history.push("/404");
            }
    
    }

    const displayStudents =  students.map(student =>{
      return  <div  style={{width:"100%"}} className="row align-items-center"><div className="col" ><h5 >{student.name}</h5></div><div className="col" > {student.yearOfJoin}{" "} </div><div className="col d-none d-md-block" > {student.skills}{" "} </div></div>;
        
    })
    
    if (show) {
      return (
        <Alert variant="secondary" onClose={() => setShow(false)} dismissible>
          
          {students.length ==0 ? "No Students Found":displayStudents }
      
        </Alert>
      );
    }
    return <div  className="row align-items-center" onClick={(e) => getStudents(props.college._id) } style={{width:"100%", cursor:"pointer"}} ><div className="col">{props.college.name} {" "}</div><div className="col" >{props.college.state}{" "}</div><div className="col d-none d-md-block" > {props.college.city}{" "} </div><div className="col d-none d-md-block" > {props.college.noofstudents}{" "} </div><div className="col d-none d-md-block" > {props.college.courses}{" "} </div></div> ;
  }

  
const CollegeDetails = (props) => {

    
    const [isSpinner,setSpinner] =useState(true);
    const [isSpinner1,setSpinner1] =useState(false);

    
    return (


            <div className="row  align-items-center App1" style={{width:"100%", cursor:"pointer", margin:"0%"}} >
              <div className="col"><a href={`/college/${props.college._id}`} >{props.college.name} {" "}</a></div>
              <div className="col d-none d-md-block" >{props.college.state}{" "}</div>
              <div className="col d-none d-md-block" > {props.college.city}{" "} </div>
              <div className="col d-none d-md-block" > {props.college.noofstudents}{" "} </div>
              <div className="col d-none d-md-block" > {props.college.courses}{" "} </div>
            </div>  

    )
}

export default CollegeDetails
