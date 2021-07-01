import React from 'react';
import axios from 'axios';
import {useContext ,useState, useEffect } from 'react';
import { UserContext } from '../App';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

function Login(props) {
    const [loginData, setLoginData] = useState({ Email: '', Password: '',Category:'' });
    const [error, setError] = useState({ emailErrorMessage: '', passwordErrorMessage: '' });
    const [message, setMessage] = useState({ message: "", color: "" })
    const [disable, setDisable] = useState({ Email: true, Password: true })
    const value = useContext(UserContext)


    useEffect(() => {
        if (value.isAuth) {
            props.history.push("/home")
        }
    }, [value, props])
     /*  useEffect(() => {
         axios.get("http://localhost:3001/login").then((response)=>{
             if(response.data.loggedIn===true){
            props.history.push("/home")
             }
            })
    }, [ props]) */


    const emailValidate = (e) => {
        let emailError = ""
        setLoginData({ ...loginData, Email: e.target.value })
        if (!e.target.value) {
            emailError = "Email is required"
            setDisable({ ...disable, Email: true })

        } else if (!loginData.Email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            emailError = "Please enter a valid email"
            setDisable({ ...disable, Email: true })
        } else {
            emailError = ""
            setDisable({ ...disable, Email: false })

        }
        setError({ ...error, emailErrorMessage: emailError })
    }
    const passwordValidate = (e) => {
        let passwordError = ""
        setLoginData({ ...loginData, Password: e.target.value })
        if (!e.target.value) {
            passwordError = "Password is required"
            setDisable({ ...disable, Password: true })
        } else {
            passwordError = ""
            setDisable({ ...disable, Password: false })
        }
        setError({ ...error, passwordErrorMessage: passwordError })
    }
    const loginCheck = (e) => {
        e.preventDefault()
        if (!error.emailErrorMessage && !error.passwordErrorMessage) {
            axios.post("http://localhost:3001/login", loginData).then((result)=>{
                    localStorage.setItem('token', result.data)
                     value.callAuth()
                    console.log("login successfull")
                    props.history.push("/home")

                })
                .catch((err) => {
                    setMessage({message:"User credentials does not match",color:"text-danger"})
                })
        }
    }
    return (
        <div style={{ paddingTop: "10%" }}>
            <style>{'body {background-color:#1995dc}'}</style>
            <Container>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4} className="mt-4">
                        <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                            <Form >
                                <Card.Body>
                                     {message.message?<p className={message.color} style={{textAlign:"center"}}>{message.message}</p>:null} 
                                    <Card.Title title="login" className=" text-center p-2">EMS Login</Card.Title>
                                    <Form.Group>
                                        <Form.Control
                                            title="email"
                                            type="email"
                                            placeholder="eg. example@domain.com"
                                            isInvalid={!!error.emailErrorMessage}
                                            autoFocus
                                         onChange={emailValidate}
                                        />
                                        <Form.Control.Feedback title="emailError" type="invalid"> {error.emailErrorMessage}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            title="password"
                                            type="password"
                                            placeholder="Enter Password"
                                            isInvalid={!!error.passwordErrorMessage}
                                            onChange={passwordValidate}
                                        />
                                        <Form.Control.Feedback title="passwordError" type="invalid">{error.passwordErrorMessage} </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button title="sign" onClick={loginCheck} block type="submit" style={{ borderRadius: "20px" }}>SIGN IN</Button>
                                </Card.Body>
                            </Form>
                            {/* <Button className="mb-3" size="sm" style={{ width: "150px", alignSelf: "center", borderRadius: "10px" }} onClick={showOtpForm}>Login with Password</Button> */}

                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Login;