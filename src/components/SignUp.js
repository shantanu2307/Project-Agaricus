import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
export default function SignUp() {
  const emailRef = useRef();
  const nameRef = useRef();
  const typeRef = useRef();
  const gstRef = useRef();
  const adhaarRef = useRef();
  const farmlandRef = useRef();
  const pincodeRef = useRef();
  const phoneRef = useRef();
  const locationRef = useRef();
  const roleRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [farmer, setFarmer] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function changeFarmer(e) {
    if (roleRef.current.value === "Farmer") {
      setFarmer(true);
    } else {
      setFarmer(false);
    }
    console.log(farmer);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      const x = await signup(emailRef.current.value, passwordRef.current.value);
      console.log("UID", x.user.uid);
      history.push("/dashboard");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" ref={phoneRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                ref={locationRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                onChange={changeFarmer}
                ref={roleRef}
                as="select"
                defaultValue="Farmer"
              >
                <option>Farmer</option>
                <option>Horticulture/Stubble Seller</option>
              </Form.Control>
            </Form.Group>
            {farmer && (
              <div>
                <Form.Group id="pincode">
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control type="text" ref={pincodeRef}></Form.Control>
                </Form.Group>
                <Form.Group id="adhaar">
                  <Form.Label>Adhaar Number</Form.Label>
                  <Form.Control type="text" ref={adhaarRef}></Form.Control>
                </Form.Group>
                <Form.Group id="farmlandPics">
                  <Form.Label>Farmland Pics</Form.Label>
                  <Form.Control
                    type="text"
                    ref={farmlandRef}
                  ></Form.Control>
                </Form.Group>
              </div>
            )}
            {!farmer && (
              <div>
                <Form.Group id="type">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    ref={typeRef}
                    as="select"
                    defaultValue="Hoticulture"
                  >
                    <option>Horticulture</option>
                    <option>Stubble Seller</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group id="gst">
                  <Form.Label>GST Number</Form.Label>
                  <Form.Control type="text" ref={gstRef}></Form.Control>
                </Form.Group>
              </div>
            )}
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account ? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
