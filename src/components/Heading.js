import React from 'react';
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  Container
} from "reactstrap";
import { AddTask } from './AddTask';

export const Heading = () => {
  return (
    <Navbar color="dark" dark> 
      <Container > 
        <NavbarBrand href="/">Tasks</NavbarBrand>
        <Nav>
          <NavItem>
            <AddTask/>
          </NavItem>
        </Nav>

      </Container>
    </Navbar>
  )
}
