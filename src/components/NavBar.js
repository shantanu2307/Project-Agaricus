import React from 'react'
import "./NavBar.css"
import {Link} from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
export default function NavBar() {
  return (
    <>
      <Navbar sticky="top" expand="lg" style={{ backgroundColor: "#8a5311" }}>
        <Navbar.Brand>
          <span className="navItem">कुकुरमुत्ता</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ backgroundColor: "white" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/login">
                <span className="navItem">Login</span>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/signup">
                <span className="navItem">SignUp</span>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
