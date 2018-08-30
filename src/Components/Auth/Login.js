import React, { Component, Fragment } from 'react';
import { Grid, Paper, Typography, FormControl, InputLabel, FormHelperText,
        Input, InputAdornment, IconButton, Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import 'typeface-roboto';
import teal from '@material-ui/core/colors/teal';
import LoginErr from './LoginErr';

const styles = {
  Grid: { margin: 20, },
  Paper: { 
    padding: 20, 
    width: 340,
    margin: 'auto', 
    textAlign: 'center', 
  },
  Btn: { marginTop: 20, },
};

const theme = createMuiTheme({ palette: { primary: teal, }, });

export default class SimpleModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
      btnDisabled: true,
      emailText: '',
      passText: '',
      showError: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleErrClose = () => {
    this.setState({ showError: false });
  };
  
  inputEmail = event => { 
    this.setState({emailText: event.target.value});
    this.enableBtn();
  }
  
  inputPass = event => {
    this.setState({passText: event.target.value});
    this.enableBtn();
  }

  enableBtn() {
    const { emailText, passText } = this.state;
    emailText && passText ? this.setState({btnDisabled: false}) : this.setState({btnDisabled: true})
  }

  login = event => {
    event.preventDefault();
    const { emailText, passText } = this.state;

    if(emailText.toLowerCase() === 'admin@domain.com' && passText === 'admin')
    this.props.handleLogin(true)
    else {
      this.props.handleLogin(false)
      this.setState({showError: true})
    }
  }

  render() {
    const { btnDisabled, showError } = this.state;
    
    return (
      <Fragment>
      
        <Grid container>
          <Grid item sm={12} style={styles.Grid}>
          <form onSubmit={this.login}>
          <MuiThemeProvider theme={theme}>
          <Paper style={styles.Paper}>

          <Typography variant="headline" gutterBottom align="center">
            Login
          </Typography>

            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="login-email">Email</InputLabel>
              <Input id="login-email" type="email" onChange={this.inputEmail} autoComplete="off" />
              <FormHelperText>Hint: admin@domain.com</FormHelperText>
            </FormControl>

            <FormControl fullWidth  margin="dense">
              <InputLabel htmlFor="login-password">Password</InputLabel>
              <Input id="login-password" autoComplete="off" onChange={this.inputPass}
                type={this.state.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword} >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>Hint: admin</FormHelperText>
            </FormControl>
            <Button variant="contained" size="large" color="primary"
              type="submit" disabled={btnDisabled} style={styles.Btn}>
             Login
            </Button>
          </Paper>
          </MuiThemeProvider>
          </form>
          </Grid>
        </Grid>

        { showError && <LoginErr showError={showError} handleErrClose={this.handleErrClose} /> }
        
      </Fragment>
    );
  }
}