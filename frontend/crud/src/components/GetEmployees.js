import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import { FormControlLabel, IconButton } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import FilterListIcon from '@material-ui/icons/FilterList';
import { UserContext } from '../App';
import { useContext } from 'react';
import Navbar from './Navbar';
const MatEdit = ({ index }) => {
    let history = useHistory();
    const handleEditClick = () => {

        history.push('/edit/' + index)
    }
    return <FormControlLabel
        control={
            <IconButton color="secondary" aria-label="add an alarm" onClick={handleEditClick} >
                <EditIcon style={{ color: blue[500] }} />
            </IconButton>
        }
    />
};
const MatDelete = ({ index }) => {

    const handleDeleteClick = () => {
        axios.delete('http://localhost:3001/delete/' + index)
            .then(result => {
                console.log(result.data)
            })
    }


    return <FormControlLabel

        control={
            <IconButton color="secondary" aria-label="add an alarm" onClick={handleDeleteClick} >
                <DeleteIcon style={{ color: red[500] }} />
            </IconButton>
        }
    />
};


function ShowEmp(props) {
    const value = useContext(UserContext)
    useEffect(() => {

        if (!value.isAuth && !value.isLoading) {

            props.history.push('/login')

            return false;

        }

    }, [props])
    const [employeeList, setEmployeeList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])
    const [q, setQ] = useState("");
    const [D, setD] = useState(false);
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const getEmployees = () => {
        Axios.get("http://localhost:3001/employee/get").then((response) => {
            setEmployeeList(response.data);
        });
    };
    const excelExport = () => {

        const ws = XLSX.utils.json_to_sheet(selectedRows);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "EmployeeData" + fileExtension);

    }
    useEffect(() => {
        getEmployees()
    }, [getEmployees]);



    const columns = [
        { field: 'id', headerName: 'id', width: 90 },
        { field: 'EmployeeName', headerName: 'Name', width: 250 },
        {
            field: 'EmployeeSalary',
            headerName: 'Salary',
            width: 150,
            editable: true,
        },
        {
            field: 'Position',
            headerName: 'Position',
            width: 150,
        },
        {

            field: 'Update',
            headerName: 'Update',
            width: 150,
            sortable: false,
            editable: true,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (

                    <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                        <MatEdit index={params.row.id} />
                    </div>
                );
            }
        },
        {

            field: 'Delete',
            headerName: 'Delete',
            width: 150,
            sortable: false,
            editable: true,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                        <MatDelete index={params.row.id} />
                    </div>
                );
            }
        }

    ];

    const columns1 = [
        { field: 'id', headerName: 'id', width: 90 },
        { field: 'EmployeeName', headerName: 'Name', width: 250 },
        {
            field: 'EmployeeSalary',
            headerName: 'Salary',
            width: 150,
            editable: true,
        },
        {
            field: 'Position',
            headerName: 'Position',
            width: 150,
        },
    ]


    function search(rows) {
        return rows.filter(row => row.EmployeeName.toLowerCase().indexOf(q) > -1)
    }


    return (


        <div style={{ height: 400, width: '100%' }}>
            <Navbar />
            <h1>Employee Details</h1>
            <FilterListIcon style={{ float: 'left' }} onClick={(e) => setD(true)} />
            {D ?
                <input style={{ float: 'left' }} type="text" value={q} onChange={(e) => setQ(e.target.value)} />
                : null}

            <Button style={{ float: 'center', marginLeft: '10px' }} variant="outline-dark" onClick={excelExport}>Export Data</Button>
            <br />
            {console.log(value.userRole)}
            <br />
            <DataGrid
                rows={search(employeeList)}
                columns={value.userRole === 'admin' ? columns : columns1}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                onRowSelected={(e) => selectedRows.push(e.data)}
            />

        </div>

    )
}
export default ShowEmp;