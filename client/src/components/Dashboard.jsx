import React, { useEffect ,useRef,useState} from 'react'
import "./../App.css"
import Footer from './Footer';
import {Form,Col,Button} from 'react-bootstrap'
import {Pie} from 'react-chartjs-2';
import CollegeDetails from '../components/CollegeDetails'
import { Tooltip } from 'chart.js';
export default  function Dashboard() {

    const [isSpinner,setSpinner]=useState(true);

    const [colleges,setColleges]=useState([]);
    const [states,setStates]=useState([]);
    const [courses,setCourses] = useState([]);

    const [searchColleges,setSearchColleges]=useState([]);
    const [isSpinner1,setSpinner1] =useState(false);
    const [searchData,setSearchData]= useState({});
    const [errMessage,setErrMessage]= useState();

    const [labels,setLables] = useState([]);
    const [stateData,setStateData] = useState([]);
    const [stateColors,setStateColors] = useState([]);
 
    const [coursesLables,setCoursesLables] = useState([]);
    const [coursesData,setCoursesData] = useState([]);
    const [coursesColors,setCoursesColors] = useState([]);

    const getAllColleges = async()=>{
      const resp = await fetch("/api/colleges/all_colleges")
      const collegesData = await resp.json();
      await setColleges(collegesData.data)
      console.log("collegesData")    
  }


    const searchRef = useRef();
    
    const getStatesData = async()=>{
        const resp = await fetch("/api/colleges/state-colleges")
        const statesData = await resp.json();
        await setStates(statesData.data)
        console.log("statesData")          
    }

    const getCoursesData = async()=>{
        const resp = await fetch("/api/colleges/courses-colleges")
        const coursesData = await resp.json();
        await setCourses(coursesData.data)
        console.log("coursesData")  
    }

    var dynamicColors = function() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    }

    const getColleges = colleges.map((college)=>{

          return <option key={colleges._id} selected={searchData.collegeName == college.name} value={college.name}>{college.name}</option>
      })

    const getStates = states.map((state)=>{

      return  <option key={state._id} value={state._id} selected={searchData.state == state._id} >{state._id}</option>
      
    })

    const handleChange = e => {
      setSearchData({ ...searchData, [e.target.name]: e.target.value });
      console.log("vijay")
    };

    const coursesList = coursesLables.map((value,index)=>
           <li key={index} style={{marginLeft:"-1em", color:coursesColors[index], "list-style":"square", fontSize:"0.8em" }}><span style={{color:"black", display:"inline","white-space": "nowrap"}}>{value}</span></li>
    )
    const statesList = labels.map((value,index)=>
           <li key={index} style={{marginLeft:"-1em", color:stateColors[index],"list-style":"square", fontSize:"0.8em" }}><span style={{color:"black",display:"inline","white-space": "nowrap"}}>{value}</span></li>
    )

    const getSearchResults = async(e) =>{

      console.log("ready")
      try{
      setSpinner1(true)
      // e.perventDefault()
      // e.persist();
      const response = await fetch('/api/colleges/getcolleges' , {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      mode:"cors",
      body :JSON.stringify(searchData)
      })
      const data = await response.json();
      
      if (data.error === false) {
          console.log(data)
          setSearchColleges(data.data)
          setSpinner1(false) 
          searchRef.current.focus();

      }else{
          setSpinner1(false) ;
          setErrMessage("internal Error...!") 
      }
      }catch(e){
          setSpinner1(false) ;
          setErrMessage("Internal Error...")
          console.log(e)
      }
    }

    useEffect(() => {
      getSearchResults()
      console.log()
  }, [searchData])
    const showColleges = searchColleges.map((college)=>{

      return  <CollegeDetails key={colleges._id} college={college}  />
    })

    useEffect(() => {
      setLables(  states.map((state)=>{return state._id }));
      setStateData( states.map((state)=>{ return state.count }));
      setStateColors( states.map(()=>{ return dynamicColors() }));
    }, [states]);

    useEffect(() => {
      setCoursesLables(  courses.map((course)=>{return course.course }));
      setCoursesData( courses.map((course)=>{ return course.count }));
      setCoursesColors( courses.map(()=>{ return dynamicColors()}));
    }, [courses]);
    
    useEffect(()=>{
        console.log("sssss")
        getAllColleges()
        getStatesData();
        getCoursesData()
        
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
        <div >
        <div className="App ">
        <h1 class="justify-content-center " style={{textAlign:"center"}}>Colleges Data</h1>
        </div>

        <div className="App " style={{padding:'0% 1% 0% 1%'}} >

        <div >
          <div class="row align-items-center no-gutters">
            <div class="col-6" style={{border: 'solid 1px rgba(191, 253, 245, 0.986)' }}>
              <div className="row align-items-center">
                <div className="col-lg-9 col-md-8 ">
                  <h3 >State</h3>
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
                      
                      legend:{
                        display:false
                      },
                      responsive:true,
                      overflow:"auto"

                    }}
                    onElementsClick={(elems,e) =>{   try{ 
                    // and then redirect to the target page:
                    setSearchData({state:labels[elems[0]._index]})

                        getSearchResults(e);
                      // window.location = `/dashboard?collegeName=&country=&state=${labels[elems[0]._index]}&city=&courses=`;
                      }catch(err){console.log(err)}
                    }}
                  />
                </div>
                <div  className="col-lg-3 col-md-4 " style={{"overflow":"auto" }} >
                  <ul style={{"overflow":"auto" }} className="legendHeight">
                    {statesList}
                  </ul>
                </div> 
              </div> 
            </div>

            <div class=" col-6" style={{border: 'solid 1px rgba(191, 253, 245, 0.986)' }}>
                <div className="row align-items-center" >
                  <div className="col-lg-9 col-md-8 " >
                    <h3 >Courses</h3>
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
                          display:false
                        },
                        responsive:true,
                        overflow:"auto",
                        Tooltip:{
                          borderWidth:0
                        }
                      }}
                      
                  
                      
                      onElementsClick={elems =>{   try{
                        // and then redirect to the target page:
                        // window.location = `/dashboard?collegeName=&country=&state=&city=&courses=${coursesLables[elems[0]._index]}`;
                        setSearchData({courses:coursesLables[elems[0]._index]})
                        }catch(e){console.log(e)}
                      }}
                    />
                  </div>
                    <div  className="col-lg-3 col-md-4" style={{"overflow-y":"auto" }} >
                      <ul style={{"overflow":"auto" }} className="legendHeight">
                        {coursesList}
                      </ul>
                    </div>
                </div>
              </div>
             

            </div>
          </div>
        </div>

        <div className="App">
            <Form onChange={handleChange} onSubmit={ (e)=>getSearchResults(e)}>
                <Form.Row>
                    <Form.Group as={Col} sm="3" md="3"  controlId="formGridState"  >

                    <Form.Control as="select"  maxMenuHeight={3}name="collegeName"  size="sm" defaultValue={searchData.collegeName}>
                        <option value="" >collegeName...</option>
                        {getColleges}
                    </Form.Control>
                    </Form.Group>
                    
                    <Form.Group as={Col} sm="2" md="2"  controlId="formGridCity">

                    <Form.Control type="text" name="country" size="sm" defaultValue={searchData.country} placeholder="Country"/>
                    </Form.Group>

                    <Form.Group as={Col} sm="3" md="3"  controlId="formGridState">

                    <Form.Control as="select"  name="state" size="sm" className="custom-select custom-select-sm" size="5" placeholder="Courses">
                        <option value="">States..</option>
                        {getStates}
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col}  sm="2" md="2" controlId="formGridZip">

                    <Form.Control type="text" name="courses" size="sm" defaultValue={searchData.courses}  placeholder="Courses"/>
                    </Form.Group>

                    <Form.Group as={Col}  sm="2" md="2" controlId="formGridZip">

                    <Button variant="primary" onClick={e => getSearchResults(e)} > Search </Button>
                    </Form.Group>

                    
                </Form.Row>
                
            </Form>
        </div>
        <div className="App2" >
            <div  className= "row align-items-center " style={{width:"97%" ,padding:"1%"}} >
                <div className="col" ref={searchRef} >College Name {" "}</div>
                <div className="col d-none d-md-block" >State{" "}</div>
                <div className="col d-none d-md-block" > City</div>
                <div className="col d-none d-md-block" >No Of Students</div>
                <div className=" col d-none d-md-block" > Courses{" "} </div>
            </div> 
            <div className="App" >
                {searchColleges.length == 0 ? "No Colleges Found" : showColleges}
            </div>
        </div>

        <Footer  />

      </div>
        
    )
    }
}
