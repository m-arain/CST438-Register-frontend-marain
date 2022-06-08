import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
//import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {DataGrid} from '@material-ui/data-grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddStudent from './AddStudent';

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
			isAdmin: false,
        }
    }

    componentDidMount() {
        this.fetchStudents();
		this.checkIsAdmin();
    }

    fetchStudents = () => {
        console.log("StudentList.fetchStudents");
        const token = Cookies.get("XSRF-TOKEN");

        fetch(
            `${SERVER_URL}/student`,
            {
                method: 'GET',
                headers: { 'X-XSRF-TOKEN': token },
                credentials: 'include',
            }
        )
        .then((response) => {
            console.log("FETCH RESP: " + response);
            return response.json();
        })
        .then((responseData) => {
            if (Array.isArray(responseData)) {
                responseData.forEach(s => { s.id = s.student_id })

                this.setState({
                    students: responseData
                });
            } else {
                toast.error("Fetch failed, unexpected response.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
        })
        .catch(err => {
            toast.error("Fetch failed.", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
        })
    }

    addStudent = (student) => {
        const token = Cookies.get('XSRF-TOKEN');

        fetch(
            `${SERVER_URL}/student`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'X-XSRF-TOKEN': token  }, credentials: 'include',
                body: JSON.stringify(student)
            }
        )
        .then(res => {
            if (res.ok) {
              toast.success("Student added successfully.", {
                  position: toast.POSITION.BOTTOM_LEFT
              });
              this.fetchStudents();
            } else {
              toast.error("Error adding Student.", {
                  position: toast.POSITION.BOTTOM_LEFT
              });
              console.error('Post http status =' + res.status);
            }})
        .catch(err => {
          toast.error("Error adding Student.", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
        })
    }
	
	checkIsAdmin = () => {
        let isAdmin = false;  
        const token = Cookies.get('XSRF-TOKEN');

        fetch(
            `${SERVER_URL}/student/place-hold`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'X-XSRF-TOKEN': token  },
                credentials: 'include',
                body: {}
            })
            .then((res) => {
                if (res.status === 401) {
                    // UNAUTHORIZED response, NOT ADMIN
                    isAdmin = false;
                } else if (res.status == 400) {
                    // BAD_REQUEST response, ADMIN!
                    isAdmin =  true;
                } else {
                    isAdmin =  false;  
                }
            })
            .catch(err => {
                toast.error("Fetch failed.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                console.error(err);
                isAdmin = false;  
            })
            .finally(() => {
                this.setState({
                    isAdmin: isAdmin
                })
            })
    }	

    render() {
        const columns = [
            { field: 'name', headerName: 'Name', width: 400 },
            { field: 'email', headerName: 'Email', width: 200 },
            { field: 'status_code', headerName: 'Status Code', width: 200 },
        ];
		
		const isAdmin = this.state.isAdmin

        return(
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            { 'Students' }
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="App">
				{isAdmin && (
                    <Grid container>
                        <Grid item>
                            <AddStudent addStudent={this.addStudent} />
                        </Grid>
                    </Grid>
				)}
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={this.state.students} columns={columns} />
                    </div>
                    <ToastContainer autoClose={1500} />
                </div>
            </div>
        );
    }
}

export default StudentList; 