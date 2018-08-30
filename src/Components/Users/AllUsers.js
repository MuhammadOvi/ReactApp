import React, { Component, Fragment } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/database';
import UsersTable from './UsersTable';

const styles = {
  Paper: {
    padding: 20,
    margin: 10,
  }
}

export default class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Loading...',
      data: '',
    }
  }

  componentDidMount() {
    const _db = firebase.database();
    _db.ref('users').on('value', snap => {
      // console.log('data Came***')
      this.setState({
        data: snap.val() || {},
        text: 'All Users Data',
      })
    })
  }

  render() {
    const { text, data } = this.state;
    
    return (
      <Fragment>
        <Grid container>
          <Grid item sm={12}>
            <Paper style={styles.Paper}>
              <Typography variant="headline" align="center">
                { text }
                <br/>
                {/* <SimpleSnackbar text={'Hello'} show={true}/> */}
              </Typography>

              {data && <UsersTable data={data} />}

            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
} 
  