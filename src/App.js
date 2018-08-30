import React, { Component, Fragment } from 'react';
import { Header, Footer } from './Components/Layout';
import { Grid } from '@material-ui/core';
import { LeftPane, RightPane, AddUser } from './Components/Body';
import AllUsers from './Components/Users/AllUsers';
import 'typeface-roboto';
import Login from './Components/Auth/Login';
import Background from './AppBG.png' ;

const styles = {
  main: {
    position: 'relative',
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: '78.5vh',
    backgroundImage: `url(${Background})`,
  },
}

export default class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      admin: false,
      currentPage: 'home',
    }
  }

  handleLogin = (x) => {
    x ? this.setState({currentPage: 'home', admin: true}) : this.setState({currentPage: 'home', admin: false})
  }

  showPage = targetPage => { this.setState({currentPage: targetPage}) }
  
  addUser = () => {
    console.log('clicked ' + Math.random())
  }
  
  render() {
    const { admin, currentPage } = this.state;

    return (
      <Fragment>

        <main style={styles.main}>
        <Header 
          handleLogin={this.handleLogin}
          admin={admin}
          showPage={this.showPage}
        />
  
          {/* when the admin state is empty, show login */}
          { !admin && <Login handleLogin={this.handleLogin} />}
  
          {/* when the admin is logged in and Add button isn't clicked, show the Home Page */}
          { admin && currentPage === 'home' && 
          (
            <Grid container>
              <LeftPane showPage={this.showPage}/>
              <RightPane />
            </Grid>
          )}

          {/* when the admin is logged in and clicked to show the List of Employees */}
          { admin && currentPage === 'users' && <AllUsers /> }
          
        <Footer />
        </main>

        {/* when the user is logged in and Add button is clicked, show the Add Form */}
        { admin && currentPage === 'home' && <AddUser addUser={this.addUser} />}
      </Fragment>
    );
  }
}