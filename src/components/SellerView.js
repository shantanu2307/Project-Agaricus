import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Navbar from "./SellerNav";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
export default function SellerView() {
  async function handleSubmit() {
    const uid = currentUser.uid;
    const response = await axios.post("/listings", {
      uid: uid,
    });
    console.log(response);
    if(response.data==="")
    {
      const x=(<div className="h1 text-center font-weight-bold">No listings found</div>)
      setResp(x);
    }
    else{
      const x = (
        <Card>
          <Card.Header className="h1 font-weight-bold text-center">
            Listing
          </Card.Header>
          <Card.Body>
            <div>
              <img
                src={
                  response.data.pics
                }
                alt="SomeImg"
                style={{width:"300px",height:"200px"}}
              ></img>
              <div>Name:{response.data.sellerName}</div>
              <div>State:{response.data.state}</div>
              <div>District:{response.data.district}</div>
              <div>Pincode:{response.data.pincode}</div>
              <div>Description:{response.data.details}</div>
              <div>
                Verified:{response.data.isVerified === true ? "True" : "False"}
              </div>
            </div>
          </Card.Body>
        </Card>
      );
      setResp(x);
    }
    
  }
  async function handleSubmit2() {
    const uid = currentUser.uid;
    const response = await axios.post("/delListing", {
      uid: uid,
    });
    const x = (
      <div className="h1 text-danger text-center font-weight-bold">
        Listing Successfully Deleted
      </div>
    );
    setResp(x);
  }
  const { currentUser } = useAuth();
  const [resp, setResp] = useState("");
  return (
    <div>
      <Navbar />
      {resp}
      <div style={{marginTop:"15%"}}>
        <Button
          className="w-50"
          type="submit"
          variant="success"
          onClick={handleSubmit}
        >
          Get Listings
        </Button>
        <Button
          className="w-50"
          type="submit"
          variant="danger"
          onClick={handleSubmit2}
        >
          Delete Listings
        </Button>
      </div>
    </div>
  );
}
