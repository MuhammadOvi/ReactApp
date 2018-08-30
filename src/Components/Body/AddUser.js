import React, { Component, Fragment } from 'react';
import { Button, MuiThemeProvider, createMuiTheme, Dialog,
  DialogContent, DialogContentText, DialogTitle, Grid, FormControl,
  Input, InputLabel, TextField, InputAdornment, DialogActions,
  IconButton, Snackbar, } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { red, teal } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import uniqid from 'uniqid';
import firebase from 'firebase/app';
import 'firebase/database';

const theme_red = createMuiTheme({ palette: { primary: red, }, });
const theme_teal = createMuiTheme({ palette: { primary: teal, }, });

const styles = {
  Button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  }
}

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      editFormData: {},
      disabledBtn: false,
      toastText: '',
      showToast: false,
    };
  }

  handleToastClose = () => { this.setState({ showToast: false }); };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  inpFName = e => {
    let editFormData = Object.assign({}, this.state.editFormData);
    editFormData.first_name = e.target.value;
    this.setState({editFormData});
  }
  inpLName = e => {
    let editFormData = Object.assign({}, this.state.editFormData);
    editFormData.last_name = e.target.value;
    this.setState({editFormData});
  }
  inpUserEmail = e => {
    let editFormData = Object.assign({}, this.state.editFormData);
    editFormData.email = e.target.value;
    this.setState({editFormData});
  }
  inpSalary = e => { 
    let editFormData = Object.assign({}, this.state.editFormData);
    editFormData.salary = e.target.value;
    this.setState({editFormData});
  }
  inpJoined = e => { 
    let editFormData = Object.assign({}, this.state.editFormData);
    editFormData.joined = e.target.value;
    this.setState({editFormData});
  }

  addUser = () => {
    
    const { first_name, last_name, email, salary, joined } = this.state.editFormData;
    if(!first_name || !last_name || !email || !salary || !joined) 
    return this.setState({showToast: true, toastText: 'Error ...',});

    const dbRef = firebase.database().ref('users');
    this.setState({disabledBtn: true})

    dbRef.push({
      id: uniqid(), first_name, last_name, email, salary, joined
    })
    .then(() => { 
      this.setState({
        showToast: true,
        disabledBtn: false,
        toastText: 'User Added',
        open: false
      });
    })
    .catch( err => {
      this.setState({
        showToast: true,
        disabledBtn: false,
        toastText: err.code,
      })
    })
  }

  render() {
    const { disabledBtn, toastText, showToast } = this.state;

    return (
      <Fragment>
        <MuiThemeProvider theme={theme_red}>
          <Button variant="fab" color="primary" aria-label="Add" 
            style={styles.Button}
            onClick={this.handleClickOpen}>
            <AddIcon />
          </Button>
        </MuiThemeProvider>
        <MuiThemeProvider theme={theme_teal}>
        <form onSubmit={() => {return false;}}>
          <Dialog open={this.state.open} onClose={this.handleClose}
            aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">Add User</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You can add new users here - make sure to fill all the fields.
              </DialogContentText>
              <Grid container>
                <Grid item sm={12}>
                <form onSubmit={() => {return false}}>

                  <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="first_name">First Name</InputLabel>
                    <Input id="first_name" type="text" onChange={this.inpFName} autoComplete="off" />
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="last_name">Last Name</InputLabel>
                    <Input id="last_name" type="text" onChange={this.inpLName} autoComplete="off" />
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" type="email" onChange={this.inpUserEmail} autoComplete="off" />
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="salary">Salary</InputLabel>
                    <Input id="salary" onChange={this.inpSalary}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <TextField id="date" label="Joined Date"
                     onChange={this.inpJoined}  
                    type="date" InputLabelProps={{shrink: true,}}
                  />
                  </FormControl>
                </form>
                </Grid>
              </Grid>
                
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" disabled={disabledBtn}>
                Cancel
              </Button>
              <Button onClick={this.addUser} variant="contained" color="primary" disabled={disabledBtn}>
                Add User
              </Button>
            </DialogActions>
          </Dialog>
        </form>
        </MuiThemeProvider>

        <div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
          open={showToast}
          autoHideDuration={6000}
          onClose={this.handleToastClose}
          ContentProps={{ 'aria-describedby': 'message-id', }}
          message={<span id="message-id">{toastText}</span>}
          action={[,
            <IconButton
              key="close" aria-label="Close" color="inherit"
              style={styles.close} onClick={this.handleToastClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        </div>
      </Fragment>
    )
  }
}
