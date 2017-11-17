import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  HashRouter,
  Switch
} from 'react-router-dom';

import Login from './pages/Login';
import Layout from './Layout';
import System from './pages/System';
import House from './pages/House';

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
      <HashRouter>
        <div style={{height: "100%", width: "100%"}}>
          {!this.state.loggedIn && 
            <Redirect to="/login"/>
          }

          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route path="/" render={props => (
              <Layout>
                <Route exact path="/system" component={System} />
                <Route exact path='/house' component={House} />
              </Layout>
            )}/>
          </Switch>
          
        </div>
      </HashRouter>
    );
  }
}

export default App;
