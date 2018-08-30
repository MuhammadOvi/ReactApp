import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';

const styles = {
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: -75,
    padding: 10,
    background: '#F5F5F5',
  }
}

export default class Footer extends Component {
  render() {
    return (
      <Fragment>
        {/* Footer */}
        <footer style={styles.footer}>
          <Typography variant="subheading" align="center" gutterBottom>
            Made with Love!
          </Typography>
          <Typography variant="caption" align="center" color="textSecondary" component="p">
            Owais Muhammad
          </Typography>
        </footer>
        {/* End footer */}
      </Fragment>
    )
  }
}