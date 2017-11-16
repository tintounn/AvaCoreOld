import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  render() {
    return (
      <Router>
        <div style={{height: "100%", width: "100%"}}>
          {!this.state.loggedIn && 
            <Redirect to="/login"/>
          }

          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
        </div>
      </Router>
    );
  }
}

export default App;
