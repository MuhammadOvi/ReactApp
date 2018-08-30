import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu } from '@material-ui/core';
import { AccountCircle, Fingerprint } from '@material-ui/icons';

const styles = {
  AppBar: {
    background: '#009688',
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  Logo: {
    cursor: 'pointer',
  }
}

export default class Header extends Component {
  constructor (props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => { this.setState({ anchorEl: null }); };

  manageLogin = () => { this.props.handleLogin(false); this.handleClose() };
  
  goHome = () => { this.props.showPage('home'); this.handleClose() };

  showUsers = () => { this.props.showPage('users'); this.handleClose() };

  render() {
    const { anchorEl } = this.state;
    const { admin } = this.props;

    const open = Boolean(anchorEl)
    return (
      <Fragment>
        <AppBar position="fixed" style={styles.AppBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={styles.Logo}
              onClick={this.goHome}
            >
                Reliable Punching
            </Typography>
          <section style={styles.rightToolbar}>
          { admin ?
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true" onClick={this.handleMenu}
                color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar" anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                open={open} onClose={this.handleClose} >

                <MenuItem onClick={this.showUsers}>Users</MenuItem>
                <MenuItem onClick={this.manageLogin}>Logout</MenuItem>
              </Menu>
            </div>
            :
            <IconButton onClick={this.manageLogin} color="inherit">
              <Fingerprint />
            </IconButton>
          }
          </section>
          </Toolbar>
        </AppBar>
      </Fragment>
    )
  }
}