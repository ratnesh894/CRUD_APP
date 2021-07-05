
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
//import {Container,Button,Form,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import {Alert} from 'react-bootstrap';
import { useHistory }from 'react-router-dom';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import {inputFormElements} from './formElement';



function AddEmployee(){
    const [message,setMessage] = useState("");
    const [data,setData] = useState({
        id:'',
        EmployeeName:'',
        EmployeeSalary:'',
        Position:''
    })
    const validate = () =>{
        let idMessage="";
        let EmployeeNameMessage="";
        let EmployeeSalaryMessage="";
        let PositionMessage="";
        if(!data.id){
            idMessage="ID is Required"
        }
        if(!data.EmployeeName){
            EmployeeNameMessage = "Name is Required"
        }

        if(!data.EmployeeSalary){
            EmployeeSalaryMessage="Salary is Required"
        }
        if(!data.Position){
            PositionMessage="Position is Required"
        }
        setError({
            idError:idMessage,
            nameError:EmployeeNameMessage,
            salaryError:EmployeeSalaryMessage,
            positionError:PositionMessage
        })

        if(idMessage || EmployeeNameMessage || EmployeeNameMessage || PositionMessage){
            return false
        }else{
            return true
        }
    }
    const [error,setError] = useState({
        idError:'',
        nameError:'',
        salaryError:'',
        positionError:''
    })
    let history=useHistory();
    function Cancel(){

        history.push('/');
    }
    
     const submitData=(e)=>{
        e.preventDefault();
        const isValid = validate();
        if(isValid){
            axios.post('http://localhost:3001/add',data)
            .then((result)=>{
               setMessage({message:"Added Succesfully", variant:"success"})
            })
            .catch((error)=>{
                setMessage({message:"Something Went Wrong", variant:"danger"})
            })
        } 
    }
    
    return(
    <div style={{paddingTop:'10%'}}>
  
   <Grid>
   <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
   <CardContent>
            <Typography gutterBottom variant="h5">
              Add Employee
          </Typography> 
          {message?
           <Alert variant={message.variant}>{message.message}</Alert>:
          <form onSubmit={submitData}>
             {/*  <Grid container spacing={1}>
              <Grid item xs={12}>
                  <TextField type="number" placeholder="Enter Employee Id" label="id" variant="outlined"
                  onChange={e=>setData({...data,id:e.target.value})} fullWidth required />
                </Grid>
                <Grid xs={12}  item>
                  <TextField placeholder="Enter Employee Name" label=" Name" variant="outlined"
                  onChange={e=>setData({...data,EmployeeName:e.target.value})} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="number" placeholder="Enter Salary" label="Salary" variant="outlined" 
                  onChange={e=>setData({...data,EmployeeSalary:e.target.value})}  fullWidth required />
                </Grid>
                <Grid xs={12}  item>
                  <TextField placeholder="Position" label="Position" variant="outlined"
                  onChange={e=>setData({...data,Position:e.target.value})}  fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
                </Grid> */}
                <Typography variant="body2" align="left" gutterBottom>Add Employee </Typography>
                <Grid container spacing={1}>
                    {
                        inputFormElements.slice(0, 10).map(input => <Grid xs={input.xs} sm={input.sm} item>
                            <TextField {...input}  />
                            </Grid>)
                    }
                    </Grid>
                    <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
            </form>
}
          </CardContent>
        </Card>
      </Grid>
   </div>
   
    );
}

export default AddEmployee;