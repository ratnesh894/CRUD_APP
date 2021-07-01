import React  from 'react';
import {Button} from 'react-bootstrap';
import { UserContext } from '../App';
import { useContext,useEffect } from 'react';
import Navbars from './Navbar';

function Home(props){
  const value = useContext(UserContext) 
  useEffect(()=>{

    if(!value.isAuth && !value.isLoading){

        props.history.push('/login')

        return false;

    }

    },[props])
    const add=()=>{
        props.history.push('/Add');
    }
    const get=()=>{
        props.history.push('/show')
    }
    return(
        <>
         <Navbars/> 
        <h1 style={{backgroundColor:"lightblue"}}>Employee Management System</h1>
            <br></br>
        <div className="container">  
        {value.userRole==="admin"?
  <Button onClick={add} variant="primary" size="lg" block>
    Add Employee
  </Button>:null}
  <br/>
  <br/>
  <Button onClick={get} variant="success" size="lg" block>
    View Details
  </Button>
  </div>
</>
    )
}

export default Home;