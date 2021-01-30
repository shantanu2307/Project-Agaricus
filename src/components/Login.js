import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import './login.css'
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const user=await login(emailRef.current.value, passwordRef.current.value);
      const uid=user.user.uid;
      const response=await axios.get('/role',{
        uid:uid
      });
      console.log(response);
      const role=response.data.role
      if(role==="farmer")
      {
        history.push('/dashboard');
      }else if (role==="seller"){
        history.push('/seller');
      }
    } catch {
      setError("Failed to Sign In");
    }
    setLoading(false);
  }

  return (
    <>
    <div className="rounded">
    <div className="basic">
      <div id="wrapper">
        <div id="container" className="rounded">
          <div className="row">
            <div className="information-column col-12 col-md-5">
              <div className="content">
                
              </div>
            </div>
            <div className="form-column col-12 col-md-7" >
            <h1 className="mb-lg-5">Login</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Button disabled={loading} className="w-100" type="submit">
                    Login
                  </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                  <Link to="/forgot-password">Forgot Password ?</Link>
                </div>
                <div className="w-100 text-center mt-2">
                Need an account ? <Link to="/signup">Sign Up</Link>
                </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
