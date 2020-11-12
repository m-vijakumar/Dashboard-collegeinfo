import React,{useState,useEffect} from 'react'
import {Form,Col,Button} from 'react-bootstrap'
import CollegeDetails from '../components/CollegeDetails'
import "./../App.css"
// import { options } from '../../../routers/api/colleges';
 const Search = ({location},props) => {


    const [colleges,setColleges]=useState([]);
    const [states,setStates]=useState([]);
    const [searchColleges,setSearchColleges]=useState([]);
    const [isSpinner,setSpinner] =useState(true);
    const [isSpinner1,setSpinner1] =useState(false);
    const [searchData,setSearchData]= useState({});
    const [errMessage,setErrMessage]= useState();


    const getAllColleges = async()=>{
        const resp = await fetch("/api/colleges/all_colleges")
        const collegesData = await resp.json();
        await setColleges(collegesData.data)
        console.log("collegesData")    
    }

    const getAllStates = async()=>{
        const resp = await fetch("/api/colleges/state-colleges")
        const collegesData = await resp.json();
        await setStates(collegesData.data)
        console.log("collegesData")    
    }

    const getColleges = colleges.map((college)=>{

             return <option key={colleges._id} selected={searchData.collegeName == college.name} value={college.name}>{college.name}</option>
        })
    
    const getStates = states.map((state)=>{

        return  <option key={state._id} value={state._id} selected={searchData.state == state._id} >{state._id}</option>
        
    })


    const handleChange = e => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
        //console.log("vijay")
      };

    const getSearchResults = async(e) =>{

        console.log("ready")
        try{
        setSpinner1(true)
        // e.perventDefault()
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
            // console.log(data)
            // setSearchColleges(data)
            // setSpinner1(false)  
            console.log(data)
        setSearchColleges(data.data)
            setSpinner1(false) 

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
    }, [searchData])

    const showColleges = searchColleges.map((college)=>{

        return  <CollegeDetails key={colleges._id} college={college} />
   })

    const getparams = async()=>{
        const params = new URLSearchParams(location.search);

        const searchdata = {
            collegeName : params.get('collegeName'),
            state : params.get('state'),
            country : params.get('country'),
            city : params.get('city'),
            courses : params.get('courses')
        }

        await setSearchData(searchdata);
    }
  
    useEffect(() => {
        getparams()   
        getAllColleges()
        getAllStates()

    }, [])
    return (
        <div>
        <div className="App">
            <Form>
                <Form.Row>
                <Form.Group as={Col} sm="3" md="3"  controlId="formGridState">
                <Form.Label>College Name</Form.Label>
                <Form.Control as="select" name="collegeName" defaultValue={searchData.collegeName}>
                    <option value="">Choose...</option>
                    {getColleges}
                </Form.Control>
                </Form.Group>
                
                <Form.Group as={Col} sm="3" md="3"  controlId="formGridCity">
                <Form.Label>Country{searchData.country}</Form.Label>
                <Form.Control type="text" name="country" defaultValue={searchData.country}/>
                </Form.Group>

                <Form.Group as={Col} sm="3" md="3"  controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select"  name="state">
                <option value="">Choose...</option>
                {getStates}
   
                </Form.Control>
                </Form.Group>

                <Form.Group as={Col}  sm="3" md="3" controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" defaultValue={searchData.city}/>
                </Form.Group>

                <Form.Group as={Col}  sm="3" md="3" controlId="formGridZip">
                <Form.Label>Courses</Form.Label>
                <Form.Control type="text" name="courses" defaultValue={searchData.courses} />
                </Form.Group>
                
              
                </Form.Row>
                <Button variant="primary" type="submit" style={{alignItems:"right"}} > Submit </Button>
                <div className="d-flex justify-content-end" >
                <Button className="btn btn-primary"><h5>Create</h5></Button>
              </div>
            </Form>
            </div>
            <div className="App">
                {showColleges}
            </div>
        </div>
    )
}

export default Search;