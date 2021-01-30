import React from 'react'
import "./NavBar.css"
import {Link} from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
export default function NavBar() {
  return (
    <>
      <Navbar sticky="top" expand="lg" style={{ backgroundColor: "#83590b" }}>
        <Navbar.Brand>
          <Link to="/" >
          <span className="navItem">कुकुरमुत्ता</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ backgroundColor: "#fffddd" }}
        />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="">
            <Nav.Link>
              <Link to="/login">
                <span className="navItem">Login</span>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/signup">
                <span className="navItem">Sign Up</span>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
