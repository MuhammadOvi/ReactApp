import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default class LoginErr extends Component {
  
  render() {
    const { showError } = this.props;

    return (
      <div>
        <Dialog open={showError} onClose={this.props.handleErrClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Invalid Credentials"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have provided either invalid email or password!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleErrClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}