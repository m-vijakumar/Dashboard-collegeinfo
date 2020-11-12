import React, { useState } from 'react'
import {Alert , Button} from 'react-bootstrap'

function AlertDismissibleExample(props) {
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
        return  <h5 >{student.name}</h5>
    })

    if (show) {
      return (
        <Alert variant="secondary" onClose={() => setShow(false)} dismissible>
          
          {students.length ==0 ? "No Students Found":displayStudents }
      
        </Alert>
      );
    }
    return <p style={{width:"100%", cursor:"pointer"}} onClick={(e) => getStudents(props.college._id) } ><table  className="row align-items-center"><td className="col">{props.college.name} {" "}</td><td className="col" >{props.college.state}{" "}</td><td className="col" > {props.college.city}{" "} </td><td className="col" > {props.college.noofstudents}{" "} </td><td className="col" > {props.college.courses}{" "} </td></table>  </p>;
  }

  
const CollegeDetails = (props) => {

    
    const [isSpinner,setSpinner] =useState(true);
    const [isSpinner1,setSpinner1] =useState(false);

    
    return (

          <div className=" App1" >
                  <AlertDismissibleExample  college={props.college}  />        
          </div>
    )
}

export default CollegeDetails
