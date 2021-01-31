import React, { useRef, useState } from 'react'
import { Card, Alert, Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Navbar from './SellerNav'
import './seller.css'
export default function Seller() {
  async function handleSubmit(e) {
    e.preventDefault();
    var get = await axios.post('/listings', {
      uid: currentUser.uid
    });
    var org = picRef.current.value;
    var res1 = org.replace("https://drive.google.com/file/d/", "");
    var res2 = res1.replace("/view?usp=sharing", "");
    const z = "https://drive.google.com/thumbnail?id=" + res2;
    const details = await axios.get(
      "https://api.postalpincode.in/pincode/" + pincodeRef.current.value
    );
    const state = details.data[0].PostOffice[0].State;
    const district = details.data[0].PostOffice[0].District;
    console.log(state,district)
    if (get.data === "") {
      const response = await axios.post("/listing", {
        uid: currentUser.uid,
        sellerName: nameRef.current.value,
        certificate: certRef.current.value,
        pincode: pincodeRef.current.value,
        details: descriptionRef.current.value,
        state,
        district,
        pics: z,
      });
      console.log(response);
      var x = (<Alert variant="success">Your Listing has been posted successfully</Alert>)
      setError(x);
    }
    else {
      const x = (
        <Alert variant="danger">
          Your Listing already exists
        </Alert>
      );
      setError(x);
    }

  }
  const nameRef = useRef();
  const descriptionRef = useRef();
  const pincodeRef = useRef();
  const certRef = useRef();
  const picRef = useRef();
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  return (
    <div>
      <Navbar />
      {error}
      <div className="h1 text-center">Welcome {currentUser.email}!</div>
      <Card>
        <div className="seller">
          <h2 className="text-uppercase" style={{ paddingTop: "8% " }}>
            Create A Listing
          </h2>
          <Card.Body>
            <div>
              <Form
                className="d-flex justify-content-center flex-row"
                style={{ gap: "20%" }}
              >
                <div className="region">
                  <Form.Group id="name">
                    <Form.Label className="font-weight-bold">
                      Person Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      ref={nameRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="pincode">
                    <Form.Label className="font-weight-bold">
                      Pincode
                    </Form.Label>
                    <Form.Control
                      type="text"
                      ref={pincodeRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                </div>
                <div className="region">
                  <Form.Group id="description">
                    <Form.Label className="font-weight-bold">
                      Description
                    </Form.Label>
                    <Form.Control
                      type="text"
                      ref={descriptionRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="certification">
                    <Form.Label className="font-weight-bold">
                      Certification
                    </Form.Label>
                    <br></br>
                    <div>
                      <em className="font-smaller" style={{ fontSize: "13px" }}>
                        Add Google Drive Link
                      </em>
                    </div>
                    <Form.Control
                      ref={certRef}
                      type="text"
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="certification">
                    <Form.Label className="font-weight-bold">
                      Pictures
                    </Form.Label>
                    <br></br>
                    <div>
                      <em className="font-smaller" style={{ fontSize: "13px" }}>
                        Add Google Drive Link
                      </em>
                    </div>
                    <Form.Control
                      ref={picRef}
                      type="text"
                      required
                    ></Form.Control>
                  </Form.Group>
                </div>
              </Form>
            </div>
            <div>
              <Button
                onClick={handleSubmit}
                 className="w-20"
                type="submit"
                style={{ marginLeft: "50%", marginBottom: "6%" }}
              >
                Submit
              </Button>
            </div>
          </Card.Body>
        </div>
      </Card>
      <div className="text-danger text-center font-weight-bold font-weight-italics mt-3">
        The default status is unverified. It will be verified once our experts
        analyse the documents.
      </div>
    </div>
  );
}
