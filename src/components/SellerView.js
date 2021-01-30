import React,{useState} from 'react';
import {Card,Button} from 'react-bootstrap';
import Navbar from './SellerNav';
import axios from 'axios';
import {useAuth} from '../contexts/AuthContext'
export default function SellerView() {
  async function handleSubmit(){
    const uid = currentUser.uid;
    const response = await axios.post("/listings", {
      uid:uid
    });
    console.log(response);
    
  }
  async function handleSubmit2() {
    const uid = currentUser.uid;
    const response = await axios.post("/delListing", {
      uid: uid
  })}
  const {currentUser}=useAuth();
  const [resp,setResp]=useState();
  return (
    <div>
      <Navbar />
      <Card>
        <Card.Header className=" h1 text-center text-uppercase font-weight-bold">My Listing</Card.Header>
      </Card>
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
  );
}
