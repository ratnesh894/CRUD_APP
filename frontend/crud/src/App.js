import logo from './logo.svg';
import './App.css';
import React, { useEffect, useCallback, useState } from 'react';
import Home from './components/Home';
import {Switch ,Route} from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import Navbar from './components/Navbar';
import GetEmployee from './components/GetEmployees'
import EditEmployee from './components/EditEmployee';
import Login from './components/login';
import axios from 'axios';
export const UserContext = React.createContext()
function App() {
   const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({ Email: '', Category: '' })

  const authToken = useCallback(async () => {
    const token = localStorage.getItem("token")
    await axios.get("http://localhost:3001/data?token=" + token)
      .then((result) => {
         setUserData({ Email: result.data.rows[0].Email, Category: result.data.rows[0].Category }) 
       console.log(result.data.rows[0].Email);
        setAuth(true)
        setLoading(false)
      })
      .catch((err) => {
        setAuth(false)
        setLoading(false)
        setUserData({ Email: '', Category: '' })
      })
  }, [])  

   useEffect(() => {
    authToken()
  }, [authToken]) 

   if (!auth && loading === true) {
    return (<div style={{ display: "flex", justifyContent: "center", top: "40%" }}><p>Checking....</p></div>)
  } else { 

  return (
    <div className="App">
       <UserContext.Provider value={{ isAuth: auth, isLoading: loading, userName: userData.Email, userRole: userData.Category,callAuth:authToken }}>  
     
     <Switch>
     <Route path='/home' exact component={Home}/> 
    
     <Route  path='/Add' exact component={AddEmployee}/> :
     <Route path='/show' exact component={GetEmployee}/>
     <Route path='/edit/:id' exact component={EditEmployee}/>
    <Route path='/login' exact component={Login}/>
     <Route path='/' exact component={Home}/> 
    </Switch>
     </UserContext.Provider> 
     </div>
   
  );
}
}
export default App;
