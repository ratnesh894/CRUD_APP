
import React, { useLayoutEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Container,Button,Form,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import {Alert} from 'react-bootstrap';
import { useHistory }from 'react-router-dom';
import Feedback from 'react-bootstrap/esm/Feedback';


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
        
        <Container className="mt-4">
           
        <Row>
        <h4 style={{textAlign:"justify"}}>Add Employee</h4>
            <Col>
                {message?
                <Alert variant={message.variant}>{message.message}</Alert>:
                <Form onSubmit={submitData}>
                    <Form.Group>
                        <Form.Label>Employee ID: </Form.Label>
                        <Form.Control type="text" onChange={e=>setData({...data,id:e.target.value})}
                        isInvalid={!!error.salaryError}/> 
                        <Form.Control.Feedback type='invalid'>{error.idError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Employee Name: </Form.Label>
                        <Form.Control type="text" onChange={e=>setData({...data,EmployeeName:e.target.value})}
                        isInvalid={!!error.salaryError}/>
                         <Form.Control.Feedback type='invalid'>{error.nameError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Employee Salary: </Form.Label>
                        <Form.Control type="text" onChange={e=>setData({...data,EmployeeSalary:e.target.value})} 
                        isInvalid={!!error.salaryError}/>
                        <Form.Control.Feedback type='invalid'>{error.salaryError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Employee Position: </Form.Label>
                        <Form.Control type="text" onChange={e=>setData({...data,Position:e.target.value})}
                        isInvalid={!!error.positionError}/>
                         <Form.Control.Feedback type='invalid'>{error.positionError}</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="success" type="submit">Add Employee</Button>
                    <Button variant="danger" onClick={Cancel}>Cancel</Button>
                </Form>
}
            </Col>
            <Col></Col>
        </Row>
    </Container>

    )
}

export default AddEmployee;