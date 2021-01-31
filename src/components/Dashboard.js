import React, { useState ,useRef} from "react";
import { Card, Button,Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Navbar from './FarmerNavBar'
export default function Dashboard() {
  const { currentUser } = useAuth();
  const [listingArray,setListingArray]=useState("");
  async function handleSubmit(e){
    e.preventDefault();
    const details = await axios.get("https://api.postalpincode.in/pincode/"+pincodeRef.current.value);
    const state=details.data[0].PostOffice[0].State;
    const district=details.data[0].PostOffice[0].District;
    console.log(details);
    const response =await axios.post('/allListing',{
      pincode:pincodeRef.current.value,
      state:state,
      district:district
    });
    console.log(response);
  }
  const pincodeRef=useRef();
  const typeRef=useRef();
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
          <Form.Group id="pincode">
            <Form.Label className="font-weight-bold">Pincode:</Form.Label>
            <Form.Control
              type="text"
              ref={pincodeRef}
              className="w-100"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="type">
            <Form.Label className="font-weight-bold">Type</Form.Label>
            <Form.Control ref={typeRef} as="select" defaultValue="Hoticulture">
              <option>Horticulture</option>
              <option>Stubble</option>
            </Form.Control>
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
