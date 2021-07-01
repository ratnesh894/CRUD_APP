import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



function EditEmployee(props) {
    const [message, setMessage] = useState("")
    const [data, setData] = useState({})
    useEffect(async () => {

        const response = await axios.get('http://localhost:3001/employee/' + props.match.params.id)
        setData(response.data[0])

    }, [props])
    const [error, setError] = useState({
        idError: '',
        EmloyeeNameError: '',
        EmployeeSalaryError: '',
        PositionError: ''
    })

    const validate = () => {
        let idMessage = "";
        let EmployeeNameMessage = "";
        let EmployeeSalaryMessage = "";
        let PositionMessage = "";
        if (!data.id) {
            idMessage = "Id is Required"
        }

        if (!data.EmployeeName) {
            EmployeeNameMessage = "Name is Required"
        }
        if (!data.EmployeeSalary) {
            EmployeeSalaryMessage = "Salary is Required"
        }
        if (!data.Position) {
            PositionMessage = "Position is Required"
        }

        setError({
            idError: idMessage,
            EmployeeNameError: EmployeeNameMessage,
            EmployeeSalaryError: EmployeeSalaryMessage,
            PositionError: PositionMessage
        })

        if (idMessage || EmployeeNameMessage || EmployeeSalaryMessage || PositionMessage) {
            return false
        } else {
            return true
        }
    }
    let history = useHistory();
    function Cancel() {

        history.push('/');
    }
    const submitData = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            axios.put('http://localhost:3001/update', data)
                .then((result) => {
                    setMessage("Updated Successfully")
                })
                .catch((err) => {
                    setMessage("Operation unsuccessfully")
                })
        }
    }
    return (
        <Container className="mt-4">
            <h3 style={{ textAlign: 'justify' }}>Edit Employee</h3>
            <Row>
                <Col>
                    {message ? <h2>{message}</h2> :
                        <Form onSubmit={submitData}>
                            {data ?
                                <>
                                    <Form.Group>
                                        <Form.Label>Employee id: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={data.id}
                                            onChange={e => setData({ ...data, id: e.target.value })} />
                                        <small>{error.idError}</small>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Employee Name: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={data.EmployeeName}
                                            onChange={e => setData({ ...data, EmployeeName: e.target.value })} />
                                        <small>{error.EmployeeNameError}</small>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Employee Salary: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={data.EmployeeSalary}
                                            onChange={e => setData({ ...data, EmployeeSalary: e.target.value })} />
                                        <small>{error.EmployeeSalaryError}</small>

                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Employee Position: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={data.Position}
                                            onChange={e => setData({ ...data, Position: e.target.value })} />
                                        <small>{error.PositionError}</small>

                                    </Form.Group>
                                    <Button variant="success" type="submit">Edit Employee</Button>{' '}
                                    <Button variant="danger" onClick={Cancel}>Cancel</Button>
                                </>
                                : null}
                        </Form>
                    }
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}


export default EditEmployee;