import React, { useState ,useRef} from "react";
import { Card, Button, Alert,Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from './FarmerNavBar'
export default function Dashboard() {
  const { currentUser } = useAuth();
  const [listingArray,setListingArray]=useState("");
  async function handleSubmit(){
    const response =await axios.post('/allListing',{
      state:stateRef.current.value,
      district:districtRef.current.value,
      pincode:pincodeRef.currenrt.value
    });
    console.log(response);
  }
  const stateRef=useRef();
  const districtRef=useRef();
  const pincodeRef=useRef();
  return (
    <>
      <Navbar></Navbar>
      <Card>
        <Card.Header className="h1 font-weight-bold text-center text-uppercase bg-white">
          Welcome {currentUser.email}
        </Card.Header>
      </Card>
      <div className=" mt-3 h2 text-center text-capitalize font-weight-bold">
        Get listings for spores and stubble
      </div>
      {listingArray}
      <Form className="ml-2" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center" style={{ gap: "20%" }}>
          <Form.Group id="state">
            <Form.Label className="font-weight-bold">State:</Form.Label>
            <Form.Control
              type="email"
              ref={stateRef}
              className="w-100"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="district">
            <Form.Label className="font-weight-bold">District:</Form.Label>
            <Form.Control
              type="email"
              ref={districtRef}
              className="w-100"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="pincode">
            <Form.Label className="font-weight-bold">Pincode:</Form.Label>
            <Form.Control
              type="email"
              ref={pincodeRef}
              className="w-100"
              required
            ></Form.Control>
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center">
          <Button type="submit" className="w-25">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}
