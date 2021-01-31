import React, { useState ,useRef} from "react";
import { Card, Button, Alert,Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from './FarmerNavBar'
export default function Dashboard() {
  const [error, setError] = useState("");
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const [listingArray,setListingArray]=useState("");
  async function handleLogOut() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch (e) {
      setError("Failed to logout!");
    }
  }
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
      <div className=" mt-3 h2 text-center font-weight-bold">
        Get listings for spores and stubble
      </div>
      {listingArray}
      <Form className="ml-2" onSubmit={handleSubmit}>
        <Form.Group id="state">
          <Form.Label className="font-weight-bold">State:</Form.Label>
          <Form.Control type="email" ref={stateRef} required></Form.Control>
        </Form.Group>
        <Form.Group id="district">
          <Form.Label className="font-weight-bold">District:</Form.Label>
          <Form.Control type="email" ref={districtRef} required></Form.Control>
        </Form.Group>
        <Form.Group id="pincode">
          <Form.Label className="font-weight-bold">Pincode:</Form.Label>
          <Form.Control type="email" ref={pincodeRef} required></Form.Control>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </>
  );
}
