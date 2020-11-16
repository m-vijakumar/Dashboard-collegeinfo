import React, { useState,useEffect } from 'react'
import {useLocation , useHistory} from 'react-router-dom'
function Student(props) {

    const location = useLocation();
    const history = useHistory();
    const [student,setStudent]=useState({});

    const getCollegeData = async()=>{

        try{
            const response = await fetch('/api/students/getstudent' , {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
    
                },
                mode:"cors",
                body :JSON.stringify({collegeId:location.pathname.split("/")[2],studentId:location.pathname.split("/")[3]})
            })
        
            const data = await response.json();
            if (data.error === false) {
                console.log(data.data)
                setStudent(data.data)

              } else {
            
                props.history.push("/404");
              }
              // console.log(data.data)
            }catch(err){
             
              props.history.push("/404");
            }
    
    }

    useEffect(() => {
        getCollegeData()
    }, [])

    return (
        <div style={{padding:"2%"}}>

            <nav style={{backgroundColor:" rgb(240, 255, 226)"}} className="col-12 col-md-8 md-8 p-3"><a href={`/dashboard`}>Dashboard</a> / {"  "}<a href={`/college/${location.pathname.split("/")[2]}`}>College</a>{"  "} / Student</nav>
            <table className="App1 col-sm-4 " style={{margin:"2%"}}>
                <tr>
                    <td>
                        Name
                    </td>
                    <td>
                        {" : "}{student.name}
                    </td>
                </tr>
                <tr>
                    <td>
                        Year Of Join
                    </td>
                    <td>
                        {" : "}{student.yearOfJoin}
                    </td>
                </tr>
                <tr>
                    <td>
                        Skills
                    </td>
                    <td>
                        {" : "}{student.skills}
                    </td>
                </tr>
            </table>
           
        </div>
    )
}

export default Student
