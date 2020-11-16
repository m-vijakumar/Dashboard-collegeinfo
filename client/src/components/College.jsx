import React,{useState,useEffect} from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import "./../App.css"
import Footer from './Footer'
 const Search = (props) => {

    const location = useLocation();
    const history = useHistory();
    const [collegeData,setCollegeData]=useState({});
    const [students,setStudents]=useState([]);
    const [isSpinner,setSpinner] =useState(true);
    const [isSpinner1,setSpinner1] =useState(false);
    const [errMessage,setErrMessage]= useState();
    
    const getCollegeData = async()=>{

        try{
            const response = await fetch('/api/colleges/all_colleges' , {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
    
                },
                mode:"cors",
                body :JSON.stringify({collegeId:location.pathname.split("/")[2]})
            })
        
            const data = await response.json();
            if (data.error == false) {
                setCollegeData(data.data[0])
                console.log(data.data[0])
                setStudents(data.data[0].students)

              } else {
            
                props.history.push("/404");
              }
              // console.log(data.data)
            }catch(err){
             
              props.history.push("/404");
            }
    
    }

    const showStudents =  students.map((s)=>  <div className="App1" ><a href={`/college/${collegeData._id}/${s._id}`}>{s.name}</a><div>{""} </div></div>)


    useEffect(() => {
        getCollegeData();
    }, [])
    return (
        <div className="container-fluid">
            <nav className="" ><a href={`/dashboard`}>Dashboard</a> / {"  "} College</nav>
            <div className="App">
                <div className="App"  >
                    <h3>College Details</h3>
                    <div >{collegeData.name}</div>
                    <div >{collegeData.country}</div>
                    <div >{collegeData.state}</div>
                    <div >{collegeData.city}</div>
                    <div >{collegeData.noofstudents}</div>
                    <div >{collegeData.courses}</div>
                </div>
                <div className="col-4 " style={{padding:"3%"}}>
                    <h3>Students</h3>
                    {showStudents}
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}

export default Search;