import React from 'react';
import logo from './images/logo.JPG';
import compName from './images/compName.JPG';
import AuthHandler from '../Authorise'; 
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

export default class NavbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthHandler('/'); 
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() { // Switches status of state
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() { // Log user out & remove token from local storage
    this.Auth.logout();
    this.props.history.replace('/login');
  }

  getName() { // Print the user's name in the corner
    if(localStorage.getItem('id_token')) { 
      const profile = this.Auth.getProfile();
      return profile.name;
    } else return;
  }

  render() {
    return (
      <div>
        <Navbar role="navigation" expand="md">
          <img className="mb-4 headerImage" src={logo} alt="logo" width="150" height="150" />
          <div id="logo">
            <NavbarBrand href="/"><img id="centreImage" src={compName} alt="Big Plant" width="230" height="auto" /></NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>Welcome, {this.getName()}</DropdownToggle>
                <DropdownMenu right><DropdownItem onClick={this.logout}>Logout</DropdownItem></DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>About</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Our Team</DropdownItem>
                  <DropdownItem>Contact</DropdownItem>
                  <DropdownItem>Water Us</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>Buy Us Plants</DropdownToggle>
                <DropdownMenu right><DropdownItem>Thanks!</DropdownItem></DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}