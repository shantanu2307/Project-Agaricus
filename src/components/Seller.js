import React, {useRef} from 'react'
import {Card, Form,Button} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext'
import axios from 'axios'
import Navbar from './SellerNav'
export default function Seller() {
  async function handleSubmit(e){
    e.preventDefault();
    const response=await axios.post("/listing", {
      uid:currentUser.uid,
      sellerName: nameRef.current.value,
      certificate: certRef.current.value,
      pincode: pincodeRef.current.value,
      description: descriptionRef.current.value,
      state:stateRef.current.value,
      district:districtRef.current.value,
      pics:picRef.current.value,
    });
    console.log(response);
  }
  const nameRef=useRef();
  const stateRef=useRef();
  const descriptionRef=useRef();
  const pincodeRef=useRef();
  const districtRef=useRef();
  const certRef=useRef();
  const picRef=useRef();
  const {currentUser}=useAuth();
  return (
    <div>
      <Navbar />
      <div className="h1 text-center mt-lg-3">Welcome {currentUser.email}!</div>
      <Card>
        <Card.Body
          className="d-flex justify-content-center"
          style={{ gap: "20%", backgroundColor: "white" }}
        >
          <h2
            className="text-center text-uppercase"
            style={{ marginTop: "15%" }}
          >
            Create A Listing
          </h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label className="font-weight-bold">Person Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="state">
              <Form.Label className="font-weight-bold">State</Form.Label>
              <Form.Control type="text" ref={stateRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="state">
              <Form.Label className="font-weight-bold">District</Form.Label>
              <Form.Control type="text" ref={districtRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="state">
              <Form.Label className="font-weight-bold">Pincode</Form.Label>
              <Form.Control type="text" ref={pincodeRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="description">
              <Form.Label className="font-weight-bold">Description</Form.Label>
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
              <Form.Control ref={certRef} type="text" required></Form.Control>
            </Form.Group>
            <Form.Group id="certification">
              <Form.Label className="font-weight-bold">Pictures</Form.Label>
              <br></br>
              <div>
                <em className="font-smaller" style={{ fontSize: "13px" }}>
                  Add Google Drive Link
                </em>
              </div>
              <Form.Control ref={picRef} type="text" required></Form.Control>
            </Form.Group>
            <Button className="w-20" type="submit">
              Submit
            </Button>
          </Form>
          <div className="text-danger font-weight-bold font-weight-italics mt-lg-5">
            The default status is unverified. It will be verified once our
            experts analyse the documents.
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
