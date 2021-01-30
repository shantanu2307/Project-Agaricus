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
  const {currentUser}=useAuth();
  const [resp,setResp]=useState();
  return (
    <div>
      <Navbar />
      
      <Button className="w-25" type="submit" variant="success" onClick={handleSubmit}>
        Get Listings
      </Button>
    </div>
  );
}
