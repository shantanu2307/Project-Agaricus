import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./NavBar.css";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function FarmerNavBar() {
  const [error, setError] = useState("");
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  async function handleLogOut() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch (e) {
      setError("Failed to logout!");
    }
  }
  return (
    <>
      <Navbar sticky="top" expand="lg" style={{ backgroundColor: "#8a5311" }}>
        <Navbar.Brand>
          <Link to="/">
            <span className="navItem">Agaricus</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ backgroundColor: "white" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/dashboard">
                <span className="navItem">Get Listings</span>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/price">
                <span className="navItem">Price Prediction</span>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/updateprofile">
                <span className="navItem">Update Profile</span>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <span className="navItem" onClick={handleLogOut}>
                Logout
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
