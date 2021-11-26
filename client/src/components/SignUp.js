import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import Navbar from './NavBar.js'
import './signup.css'
import Footer from './Footer'
export default function SignUp() {
  const emailRef = useRef();
  const nameRef = useRef();
  const typeRef = useRef();
  const gstRef = useRef();
  const adhaarRef = useRef();
  const farmlandRef = useRef();
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
      if(farmer)
      {
        const response=await axios.post("/farmer", {
          uid: x.user.uid,
          name: nameRef.current.value,
          phoneNumber: phoneRef.current.value,
          location: locationRef.current.value,
          adhaar: adhaarRef.current.value,
          link: farmlandRef.current.value,
        });
        console.log(response);
        await history.push("/dashboard");
      }
      else{
        const response = await axios.post("/seller", {
          uid: x.user.uid,
          name: nameRef.current.value,
          phoneNumber: phoneRef.current.value,
          location: locationRef.current.value,
          type:typeRef.current.value,
          gst:gstRef.current.value,
        });
        console.log(response);
        history.push("/seller");
      }
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar></Navbar>
      <Card >
      <div className="card-body2">
        <Card.Body className="w-100" style={{background:"transparent",marginRight:"80%"}}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} >
          <h2 className="text-center text-uppercase mt-4" style={{fontSize:"40px"}}>Sign Up</h2>
          <hr style={{borderTop:"1px solid white"}}></hr>
            <br></br>
            <div className="d-flex flex-row" style={{ gap: "20%" }}>
              <div>
                <Form.Group id="name">
                  <Form.Label className="font-weight-bold">Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={nameRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label className="font-weight-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="phone">
                  <Form.Label className="font-weight-bold">
                    Phone Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    ref={phoneRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="address">
                  <Form.Label className="font-weight-bold">Location</Form.Label>
                  <Form.Control
                    type="text"
                    ref={locationRef}
                    required
                  ></Form.Control>
                </Form.Group>
              </div>
              <div>
                <Form.Group>
                  <Form.Label className="font-weight-bold">Role</Form.Label>
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
                    <Form.Group id="adhaar">
                      <Form.Label className="font-weight-bold">
                        Adhaar Number
                      </Form.Label>
                      <Form.Control type="text" ref={adhaarRef}></Form.Control>
                    </Form.Group>
                    <Form.Group id="farmlandPics">
                      <Form.Label className="font-weight-bold">
                        Farmland Pics
                      </Form.Label>
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
                      <Form.Label className="font-weight-bold">Type</Form.Label>
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
                      <Form.Label className="font-weight-bold">
                        GST Number
                      </Form.Label>
                      <Form.Control type="text" ref={gstRef}></Form.Control>
                    </Form.Group>
                  </div>
                )}
                <Form.Group id="password">
                  <Form.Label className="font-weight-bold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label className="font-weight-bold">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  ></Form.Control>
                </Form.Group>
              </div>
            </div>
            <Button disabled={loading} className="w-100" type="submit"style={{fontSize:"20px"}}>
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
        Already have an account ? <Link to="/login">Log In</Link>
      </div>
        </Card.Body>
        </div>
      </Card>
      <Footer />
    </>
  );
}
