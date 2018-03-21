import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {Navbar,NavItem, NavDropdown,Nav,MenuItem} from 'react-bootstrap';
export class NavMenu extends React.Component<{}, {}> {
    public render() {

        return <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand style='margin:0px'>
            <a href="#brand">React Test App</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/valueIncrement">
              values
            </NavItem>
            <NavItem eventKey={2} href="/StarGame">
              StarGame
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Link Right
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link Rightasdas
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>;
    }
}
