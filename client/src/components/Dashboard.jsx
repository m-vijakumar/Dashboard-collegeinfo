import React, { useEffect ,useState} from 'react'
import "./../App.css"
import Footer from './Footer';

import {Pie} from 'react-chartjs-2';
import Search from './Search';
// const option = {
//   title:{
//     display
//   }
// }
export default  function Dashboard({location},props) {

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

    const [searchData,setSearchData]= useState({});

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

    const getparams = async()=>{
      const params = new URLSearchParams(location.search);

      const searchdata = {
          state : params.get('state'),
          courses : params.get('courses')
      }

      await setSearchData(searchdata);
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

    const searchResults = <Search searchData={searchData} />
    
    useEffect(()=>{
        console.log("sssss")
        getStateColleges();

        console.log(labels )
        console.log(stateData)
        getCoursesData()
        getparams()
        setSpinner(false)
        console.log(searchData)
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
        <h1 class="justify-content-center " style={{textAlign:"center"}}>Colleges Data</h1>
        </div>

        <div className="App">
          <h2 style={{padding:"2%"}}>Search College</h2>
          { searchResults}
        </div>

        <div className="App " >

          <div class="row justify-content-start align-items-center">
            <div class="col-12 col-md-10">
              
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
                      display:false,
                      text:"States Chart",
                      fontSize:50,
                      color:"white",
                      margin:"2%"
                    },
                    legend:{
                      display:true,
                      position:'right',

                    },
                    labels:{
                      display:true,
                      fontColor:"white"
                    },
                  

                  }}
                  onElementsClick={elems =>{   try{ 
                  // and then redirect to the target page:
                  // setSearchData({...searchData ,state:labels[elems[0]._index]})

                    window.location = `/dashboard?collegeName=&country=&state=${labels[elems[0]._index]}&city=&courses=`;
                    }catch(e){console.log(e)}
                  }}
                />
         </div>
         <div className="col">
                  <h3 style={{textAlign:"right"}}>States</h3>
         </div>

          </div>
       </div>

      
        <div className="App">
        
        <div class="row justify-content-end align-items-center">
          <div className="col">
            <h3 >Courses</h3>
          </div>
        <div class="col-12 col-md-10">
        
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
              display:false,
              text:"Courses Chart",
              fontSize:50,
              color:"white",
            },
            legend:{
              display:true,
              position:"left"

            },
            labels:{
              display:true,
              fontColor:"white",
              
            }
          }}
          onElementsClick={elems =>{   try{
        // and then redirect to the target page:
        window.location = `/dashboard?collegeName=&country=&state=&city=&courses=${coursesLables[elems[0]._index]}`;
          }catch(e){console.log(e)}
      }}
         />
         
        
       </div>
     
     </div>
      </div> 
        <Footer  />
        </div>
        
    )
    }
}
