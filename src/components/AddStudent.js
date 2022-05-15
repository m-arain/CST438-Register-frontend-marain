import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,

            name: '',
            email: '',
            status: '',
            status_code: 0,
        };

        this.handleChange = this.handleChange.bind(this);
    };

  handleClickOpen = () => {
    this.setState( {open:true} );
  };

  handleClose = () => {
    this.setState( {open:false} );
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  handleAdd = () => {
     this.props.addStudent({
         name: this.state.name,
         email: this.state.email,
         status: this.state.status,
         status_code: this.state.status_code,
     });
     this.handleClose();
  }

  render()  {
    return (
        <div>
          <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
            Add Student
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle>Add Student</DialogTitle>
              <DialogContent>
                <TextField autoFocus fullWidth label="Name" name="name" value={this.state.name} onChange={this.handleChange}/> 
                <TextField autoFocus fullWidth label="Email" name="email" value={this.state.email} onChange={this.handleChange}/> 
              </DialogContent>
              <DialogActions>
                <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                <Button color="primary" onClick={this.handleAdd}>Add</Button>
              </DialogActions>
            </Dialog>
        </div>
    ); 
  }
}


AddStudent.propTypes = {
    addStudent : PropTypes.func.isRequired
}

export default AddStudent; 