import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import {Container, Navbar, Button, Collapse, NavItem, NavbarBrand, Nav, NavLink, NavbarToggler} from 'reactstrap';

class Dashboard extends Component {
  
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  
  render() {
    return (
      <div>
        <Navbar className="navbar-expand-lg navbar-dark bg-dark">
          <NavbarBrand href="#">Ava</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} className="navbar-collapse" navbar>
            <Nav className="mr-auto mt-2 mt-lg-0" navbar>
              <NavItem>
                <NavLink><Link to="/system">System</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/house">House</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink  href="#">Disabled</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default Dashboard;
