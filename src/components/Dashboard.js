import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
export default function Dashboard() {
  const [error, setError] = useState("");
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  async function handleLogOut() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch (e) {
      setError("Failed to logout!");
    }
  }
  async function handleSubmit() {
    try {
      console.log(currentUser.uid, currentUser.email);
      const response = await axios.post("/user", {
        config: {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
        uid: String(currentUser.uid),
        email: String(currentUser.email),
      });
      console.log(response);
    } catch {
      console.log("Error");
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <br />
          <strong>UID:</strong> {currentUser.uid}
          <Link to="/updateprofile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <Button type="submit" onClick={handleSubmit}>
            Send Post Request
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </>
  );
}
