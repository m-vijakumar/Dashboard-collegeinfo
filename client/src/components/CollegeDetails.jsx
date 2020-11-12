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
          
          {displayStudents}
        </Alert>
      );
    }
    return <p onClick={(e) => getStudents(props.collegeId) } >{props.collegeName}</p>;
  }

  
const CollegeDetails = (props) => {

    
    const [isSpinner,setSpinner] =useState(true);
    const [isSpinner1,setSpinner1] =useState(false);

    
    return (
        <div className=" App" >
                <AlertDismissibleExample  collegeId={props.college._id} collegeName={props.college.name} />        
        </div>
    )
}

export default CollegeDetails
