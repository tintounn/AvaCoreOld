import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true
    };
  }

  render() {
    return (
      <Router>
        <div style={{height: "100%", width: "100%"}}>
          {!this.state.loggedIn && 
            <Redirect to="/login"/>
          }

          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/login" component={Login}/>
        </div>
      </Router>
    );
  }
}

export default App;
