import React from 'react';
import {Navbar , Nav } from 'react-bootstrap'


function Header(){

    return(

        <Navbar  variant="dark"  style={{backgroundColor:"rgb(19, 19, 19)"}}>
        <Navbar.Brand href="#home"></Navbar.Brand>    
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/projects">Projects</Nav.Link>
            </Nav.Item>
          </Nav>
      </Navbar>

   
    )
}

export default Header ;