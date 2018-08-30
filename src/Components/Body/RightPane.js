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

export default class RightPane extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme_teal}>
      <Grid item xs={12} sm={6}>
        <Paper style={styles.Paper}>
          <Typography variant="headline" align="center">
            Thank You
          </Typography>
          <br/>
          <Typography variant="body1" align="center">
            This is the very first App I build in ReactJS <br/>
            I'm very thankful to the team of Saylani for their efforts!
          </Typography>
          <br/>
          <Typography align="center">
          <Button variant="contained" color="primary" onClick={() => window.open('https://iowais.com', '_blank')}>
            Visit Me
          </Button>
          </Typography>
        </Paper>
      </Grid>
      </MuiThemeProvider>
    )
  }
}