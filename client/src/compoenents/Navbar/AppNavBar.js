import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import SigninModal from '../Auth/SigninModal/SigninModal';
import SignupModal from '../Auth/SignupModal/SignupModal';
import Signout from '../Auth/Signout/Signout';
import { isAuthSelector } from '../../ducks/auth';

const AppNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="dark" dark expand="sm" className="mb-5">
      <Container>
        <NavbarBrand href="/">Shopping List</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen((isOpen) => !isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/AleksK1NG">GitHub</NavLink>
            </NavItem>
            {!props.isAuthenticated ? (
              <React.Fragment>
                <NavItem>
                  <SignupModal />
                </NavItem>
                <NavItem>
                  <SigninModal />
                </NavItem>
              </React.Fragment>
            ) : (
              <NavItem>
                <Signout />
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default connect(
  (state) => ({
    isAuthenticated: isAuthSelector(state)
  }),
  {}
)(AppNavBar);
