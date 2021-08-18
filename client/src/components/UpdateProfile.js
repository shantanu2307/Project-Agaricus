import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      await promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      await promises.push(updatePassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(setError("Fail to update account"))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>

      <div className="rounded">
        <div className="basic">
          <div id="wrapper" style={{ borderRadius: "10px" }}>
            <div className="container" id="container">
              <div className="row">
                <div className="information-columnUpdate col-12 col-md-5">
                  <div className="content">

                  </div>
                </div>
                <div className="form-column col-12 col-md-7" >
                  <h2 className="text-center mb-4">Update Profile</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        ref={emailRef}
                        defaultValue={currentUser.email}
                        required
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        ref={passwordRef}
                        placeholder="Leave blank to keep the same"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        ref={passwordConfirmRef}
                        placeholder="Leave blank to keep the same"
                      ></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">
                      Update Profile
                    </Button>
                  </Form>
                  <div className="w-100 text-center mt-2 " id="cancel">
                    <Link to="/dashboard">Cancel</Link>
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
