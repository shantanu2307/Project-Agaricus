import React,{useState} from "react";
import { useAuth } from "../contexts/AuthContext";
import "./NavBar.css";
import { Link ,useHistory} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function NavBar() {
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
              <Link to="/seller">
                <span className="navItem">Dashboard</span>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/view-listings">
                <span className="navItem">View Listing</span>
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
