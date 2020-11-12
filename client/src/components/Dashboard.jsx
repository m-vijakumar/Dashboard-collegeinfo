import React, { useEffect ,useState} from 'react'
import "./../App.css"
import Footer from './Footer';

import {Pie} from 'react-chartjs-2';
// const option = {
//   title:{
//     display
//   }
// }
export default  function Dashboard(props) {

    // const [isSpinner1,setSpinner1] =useState(false);
    const [isSpinner,setSpinner]=useState(true);

    const [colleges,setColleges]=useState([]);
    const [labels,setLables] = useState([]);
    const [stateData,setStateData] = useState([]);
    const [stateColors,setStateColors] = useState([]);

    const [courses,setCourses] = useState([]);
    const [coursesLables,setCoursesLables] = useState([]);
    const [coursesData,setCoursesData] = useState([]);
    const [coursesColors,setCoursesColors] = useState([]);


    const getStateColleges = async()=>{
        const resp = await fetch("/api/colleges/state-colleges")
        const collegesData = await resp.json();
        await setColleges(collegesData.data)
        console.log("collegesData")
        
        
    }

    const getCoursesData = async()=>{
        const resp = await fetch("/api/colleges/courses-colleges")
        const collegesData = await resp.json();
        await setCourses(collegesData.data)
        console.log("collegesData")
        
        
    }
    var dynamicColors = function() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    }

    useEffect(() => {
      setLables(  colleges.map((college)=>{return college._id }));
      setStateData( colleges.map((college)=>{ return college.count }));
      setStateColors( colleges.map(()=>{ return dynamicColors() }));
    }, [colleges]);

    useEffect(() => {
      setCoursesLables(  courses.map((course)=>{return course.course }));
      setCoursesData( courses.map((course)=>{ return course.count }));
      setCoursesColors( courses.map(()=>{ return dynamicColors()}));
    }, [courses]);

  //  const sp = <div className="spinner-border " role="status" id="spinner" style={{backgroundColor:"transparent"}}>
  //  <span className="sr-only">Loading...</span>
  //  </div> 

    useEffect(()=>{
        console.log("sssss")
        getStateColleges();

        console.log(labels )
        console.log(stateData)
        getCoursesData()
        setSpinner(false)
    },[])
    if (isSpinner) {
        return (
          <div className="d-flex justify-content-center " >
            <div className="spinner-border" role="status" id="spinner">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        )
    }else{
    return (
        <div>
       
        
        
        <div className="App ">
        <h1 class="justify-content-center align-items-center" style={{textAlign:"center"}}>Colleges Data</h1>
        </div>

        <div className="App " >

          <div class="row justify-content-around align-items-center">
            <div class="col-12 col-md-8">
              
                <Pie 
                  data={{
                    
                    labels:labels,
                    datasets:[{
                      label:"Charts  State.",
                      data:stateData,
                      backgroundColor:stateColors,
                        hoverBackgroundColor:stateColors,            
                    }]

                  }}
                  options={{
                    title:{
                      display:true,
                      text:"States Chart",
                      fontSize:50,
                      color:"white"
                    },
                    legend:{
                      display:true,
                      position:'left',

                    },
                    labels:{
                      display:true,
                      fontColor:"white"
                    },
                  

                  }}
                  onElementsClick={elems =>{   try{ 
                  // and then redirect to the target page:
                    window.location = `/search?collegeName=&country=&state=${labels[elems[0]._index]}&city=&courses=`;
                    }catch(e){console.log(e)}
                  }}
                />
         </div>

          <div class="col-6 col-md-4">
          <h2>{" "}</h2>
          </div>
          </div>
       </div>

      
        <div className="App">
        
        <div class="row justify-content-around align-items-center">
        <div class="col-6 col-md-4">
        <h2>{""}</h2>
       </div>
        <div class="col-12 col-md-8">
        
        <Pie 
        
          data={{
            
            labels:coursesLables,
            datasets:[{
              // label:"Charts by Courses.",
              data:coursesData,
              backgroundColor:coursesColors,
              hoverBackgroundColor:coursesColors }],
          }}
          options={{
            title:{
              display:true,
              text:"Courses Chart",
              fontSize:50,
              color:"white",
            },
            legend:{
              display:true,
              position:"right"

            },
            labels:{
              display:true,
              fontColor:"white",
              
            }
          }}
          onElementsClick={elems =>{   try{
        // and then redirect to the target page:
        window.location = `/search?collegeName=&country=&state=&city=&courses=${coursesLables[elems[0]._index]}`;
          }catch(e){console.log(e)}
      }}
         />
         
        
       </div>
     
     </div>
      </div>
        <Footer />
       
        
        </div>
        
    )
    }
}
