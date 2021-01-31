import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Navbar from "./SellerNav";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import './seller.css'
import './login.css'
export default function SellerView() {
  async function handleSubmit() {
    const uid = currentUser.uid;
    const response = await axios.post("/listings", {
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "application/json",
      },
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
        <div>
          <h1 className="h1 font-weight-bold text-center">
            Listing
          </h1>
          <div>
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
          </div>
        </div>
      );
      setResp(x);
    }
    
  }
  async function handleSubmit2() {
    const uid = currentUser.uid;
    const response = await axios.post("/delListing", {
      uid: uid,
    });
    console.log("Delete",response.data.flag);
    if(response.data.flag===false)
    {
      const x = (
        <div className="h1 text-danger text-center font-weight-bold">
          No record found!
        </div>
      );
      setResp(x);
    }
    else{
      const x = (
        <div className="h1 text-danger text-center font-weight-bold">
          Listing Successfully Deleted
        </div>
      );
      setResp(x);
    }
  }
  const { currentUser } = useAuth();
  const [resp, setResp] = useState("");
  return (
    <div>
      <Navbar />
          <div className="row listButtons">
            <div className="information-columnSeller col-12 col-lg-6">
              <div className="content2">
                
              </div>
            </div>
      <div className="listButtonsdiv col-12 col-lg-6">
      {resp}
        <Button
          className="w-50"
          type="submit"
          variant="success"
          onClick={handleSubmit}
          className="listButton"
          style={{padding:"3%", backgroundColor:"blue"}}
        >
          Get Listings
        </Button>
        <Button
          className="w-50"
          type="submit"
          variant="danger"
          onClick={handleSubmit2}
          className="listButton"
          style={{padding:"3%"}}
        >
        Delete Listings
        </Button>
      </div>
    </div>
    </div>
  );
}
