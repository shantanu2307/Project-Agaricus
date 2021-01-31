import React, { useState ,useRef} from "react";
import { Card, Button,Form ,Alert} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Navbar from './FarmerNavBar'
export default function Dashboard() {
  const { currentUser } = useAuth();
  const [listingArray,setListingArray]=useState("");
  async function handleSubmit(e){
    e.preventDefault();
    const details = await axios.get("https://api.postalpincode.in/pincode/"+pincodeRef.current.value);
    console.log(details);
    if (
      details.data[0].Message==="No records found"
    ) {
      setError((<span>Invalid Pincode</span>))
      setLoading(true);
    } else {
      const state = details.data[0].PostOffice[0].State;
      const district = details.data[0].PostOffice[0].District;
      console.log(state, district);
      console.log(details);
      const response = await axios.post("/allListings", {
        pincode: pincodeRef.current.value,
        state: state,
        district: district,
        type: typeRef.current.value,
      });
      console.log(response);
      const x = response.data.map((listing, index) => {
        return (
          <Card>
            <Card.Header className="text-center">Listing {index}</Card.Header>
            <Card.Body>
              <div>
                <img src={listing.pics} alt="pic"></img>
              </div>
              <div>Name: {listing.sellerName}</div>
              <div>Type: {listing.type}</div>
              <div>Details: {listing.details}</div>
              <div>State: {listing.state}</div>
              <div>District: {listing.district}</div>
              <div>Pincode:{listing.pincode}</div>
            </Card.Body>
          </Card>
        );
      });
      setEntries(x);
    }
  }
  const [entries,setEntries]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const pincodeRef=useRef();
  const typeRef=useRef();
  return (
    <>
      <Navbar></Navbar>
      <div className="farmer">
        <h3 className="h3 font-weight-bold"style={{padding:"1rem"}}>
          Welcome {currentUser.email}
        </h3>
      <br></br>
      <div className=" h2 text-center text-capitalize font-weight-bold">
        Get listings for spores and stubble
      </div>
      {loading &&(<Alert variant="danger" className="font-weight-bolder h5 mt-2">{error}</Alert>)}
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
        <br></br>
        <div className="d-flex justify-content-center">
          <Button type="submit" className="w-25">
            Submit
          </Button>
        </div>
      </Form>
      <br></br>
      
      
      <div className="d-flex justify-content-center mt-lg-5 " style={{gap:"10%",color:"black"}}>
        {entries}
      </div>
      <br></br>
      <br></br>
      </div>
    </>
  );
}
