import React, { Component } from 'react';
import { Grid, Paper, Typography, Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';

const theme_teal = createMuiTheme({ palette: { primary: teal, }, });

const styles = {
  Paper: {
    padding: 20,
    margin: 10,
  }
}

export default class LeftPane extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme_teal}>
      <Grid item xs={12} sm={6}>
        <Paper style={styles.Paper}>
          <Typography variant="display3" align="center">
            5
          </Typography>
          <Typography variant="caption" align="center">
            New Users Added This Month
          </Typography>
          <br/>
          <Typography variant="body2" align="center">
          <Button variant="contained" color="primary" onClick={() => this.props.showPage('users')}>
            View Users
          </Button>
          </Typography>
        </Paper>
      </Grid>
      </MuiThemeProvider>
    )
  }
}