import React, { Component } from 'react';
import {getSocket} from '../socket';
import {
  Redirect
} from 'react-router-dom';

import {Container, Button, Input, Card, CardBody, 
        ButtonGroup, FormGroup, Row, Col} from 'reactstrap';

import * as axios from "axios";
import * as qs from "qs";

class Login extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      "code": "",
      "codeValid": null,
      "logged": false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  handleOnClick(event) {
    axios.post('/api/login', qs.stringify({
      code: this.state.code
    })).then((res) => {
      this.setState({logged: true});
      getSocket();
    }).catch((err) => {
      this.setState({codeValid: false});
    });
  }

  render() {
    return (
        <Container id="login">
          {this.state.logged && 
            <Redirect to="/"/>
          }

          <Row className="h-100 justify-content-center align-items-center">
            <Col lg="4" md="6" sm="8" xs="10">
          
              <Card className="text-center">
                <CardBody>
                  <FormGroup>
                    <Input name="code" 
                           valid={this.state.codeValid}
                           onChange={this.handleInputChange}
                           className="col-12 form-control form-control-sm" 
                           type="text" 
                           placeholder="Code d'administration"/>
                  </FormGroup>
                  <FormGroup>
                  </FormGroup>
                  <Button onClick={this.handleOnClick} color="primary">Connexion</Button>
                </CardBody>
              </Card>

            </Col>
          </Row> 
        </Container>
    );
  }
}

export default Login;