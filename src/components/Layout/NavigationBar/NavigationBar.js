import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Link } from 'react-router-dom';

import styled from 'styled-components';

const Styles = styled.div`
  .navbar-brand{
    font-family: 'Caveat', cursive;
    font-size: 38px;
    color: #373542;
  }
`;

const navigationBar = () => (
  <Styles>
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand as={Link} to="/recepies" className="navbar-brand">Quick shopping list!</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{fontSize:'18px'}}>
          <Nav.Link as={NavLink} exact to="/recepies">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/new_recepie" >Add new recepie</Nav.Link>
          <Nav.Link as={NavLink} to="/shopping_list">Go to shopping list</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);

export default navigationBar;
