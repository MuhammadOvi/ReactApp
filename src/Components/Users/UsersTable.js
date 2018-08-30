import React, { Component, Fragment } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Snackbar,
        Dialog, DialogTitle, DialogContent, Grid, FormControl, InputLabel, Input, InputAdornment, 
        DialogActions, Button, TextField, MuiThemeProvider, createMuiTheme, } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/database';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { teal } from '@material-ui/core/colors';

const theme_teal = createMuiTheme({ palette: { primary: teal, }, });

const styles = {
  root: {
    width: '100%',
    marginTop: 16 * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  close: {
    width: 32,
    height: 32,
  },
};

export default class UsersTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabledBtn: false,
      toastText: '',
      showToast: false,
      showEditForm: false,
      editUserId: null,
      editUserIndex: null,
      editFormData: {first_name: '', last_name: '', email: '', salary: '', joined: '', }
    }
  }

  handleToastClose = () => { this.setState({ showToast: false }); };
  
  editFormClose = () => { this.setState({ showEditForm: false }); };

  edit = (user, index) => { 
    this.setState({ 
      editUserId: user.id, 
      editUserIndex: index, 
      showEditForm: true,
      editFormData: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        salary: user.salary,
        joined: user.joined, 
      }
    }); 
  }

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

  modify = () => {
    const { editUserId, editFormData } = this.state;
    const dbRef = firebase.database().ref().child('users');
    this.setState({disabledBtn: true})

    dbRef.orderByChild('id').equalTo(editUserId).once('value', snap => {
      const idToModify = Object.keys(snap.val())[0];
      dbRef.child(idToModify).update(editFormData)
      .then(() => { 
        this.setState({
          showToast: true,
          editUserId: null,
          disabledBtn: false,
          toastText: 'User Updated',
        });
      })
      .catch( err => {
        this.setState({
          showToast: true,
          editUserId: null,
          disabledBtn: false,
          toastText: err.code,
        })
      })
    });
  }

  deleteUser = id => {
    const dbRef = firebase.database().ref().child('users');
    this.setState({disabledBtn: true})
    
    dbRef.orderByChild('id').equalTo(id).once('value', snap => {
      const idToDel = Object.keys(snap.val())[0];
      dbRef.child(idToDel).set({})
      .then(() => { 
        this.setState({
          showToast: true,
          editUserId: null,
          disabledBtn: false,
          toastText: 'User Deleted',
        });
      })
      .catch( err => {
        this.setState({
          showToast: true,
          editUserId: null,
          disabledBtn: false,
          toastText: err.code,
        })
      })
    });
  }

  render() {
    const { data } = this.props;
    const { disabledBtn, toastText, showToast, showEditForm, editUserId, editUserIndex } = this.state;
    // console.log('disabledBtn:' + disabledBtn, 'toastText:' + toastText, 'showToast:' + showToast )
    const users = Object.keys(data).map( id =>  data[id] );

    return (
      <Fragment>
      <Paper style={styles.root}>
        <Table style={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map( (user, index) => {
              return (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.first_name}
                  </TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.salary}</TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>{
                    <div>
                      <IconButton 
                        onClick={() => this.edit(user, index)}
                        aria-label="Edit" disabled={disabledBtn}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton 
                        onClick={() => this.deleteUser(user.id)} 
                        color="secondary" aria-label="Delete"
                        disabled={disabledBtn}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  }</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      {
        editUserId && users &&
        <div>
        <form onSubmit={() => {return false;}}>
        <MuiThemeProvider theme={theme_teal}>
          <Dialog open={showEditForm} onClose={this.editFormClose}
            aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item sm={12}>

                  <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="first_name">First Name</InputLabel>
                    <Input
                      id="first_name" type="text"
                      onChange={this.inpFName} autoComplete="off"
                      defaultValue={users[editUserIndex].first_name}
                    />
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="last_name">Last Name</InputLabel>
                    <Input 
                      id="last_name" type="text" onChange={this.inpLName} autoComplete="off"
                      defaultValue={users[editUserIndex].last_name}
                    />
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input 
                      id="email" type="email" onChange={this.inpUserEmail} autoComplete="off"
                      defaultValue={users[editUserIndex].email}
                    />
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="salary">Salary</InputLabel>
                    <Input 
                      id="salary" onChange={this.inpSalary}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      defaultValue={users[editUserIndex].salary}
                    />
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <TextField 
                      id="date" label="Joined Date" 
                      onChange={this.inpJoined} type="date" InputLabelProps={{shrink: true,}}
                      defaultValue={users[editUserIndex].joined}
                    />
                  </FormControl>
                </Grid>
              </Grid>
                  
            </DialogContent>

              <DialogActions>
                <Button onClick={this.editFormClose} color="primary" disabled={disabledBtn}>
                  Cancel
                </Button>
                <Button onClick={this.modify} variant="contained" color="primary" disabled={disabledBtn}>
                  Modify
                </Button>
              </DialogActions>
              
            </Dialog>
          </MuiThemeProvider>
          </form>
        </div>
      }

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
    );
  }
}