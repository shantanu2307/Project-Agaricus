import React, {useState,useRef,useEffect} from 'react'
import {Card, Form,Button} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext'
import Navbar from './SellerNav'
import axios from 'axios'
export default function Seller() {
  async function handleSubmit(){

  }
  async function handleGet() {
    const response=await axios.get('seller-details',{
      uid:currentUser.uid
    })
    console.log(response);
  }
  const {currentUser}=useAuth();
  return (
    <div onLoad={handleGet}>
      <Navbar />
      <div className="h1 text-center mt-lg-3">Welcome {currentUser.email}!</div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Create A Listing</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label className="font-weight-bold">Person Name</Form.Label>
              <Form.Control type="text" required></Form.Control>
            </Form.Group>
            <Form.Group id="description">
              <Form.Label className="font-weight-bold">Description</Form.Label>
              <Form.Control type="text" required></Form.Control>
            </Form.Group>
            <Form.Group id="certification">
              <Form.Label className="font-weight-bold">Certification</Form.Label>
              <br></br>
              <div>
                <em>Add Google Drive Link</em>
              </div>
              <Form.Control type="text" required></Form.Control>
            </Form.Group>
            <Form.Group id="certification">
              <Form.Label className="font-weight-bold">Pictures</Form.Label>
              <br></br>
              <div>
                <em>Add Google Drive Link</em>
              </div>
              <Form.Control type="text" required></Form.Control>
            </Form.Group>
            <Button className="w-20" type="submit">
              Submit
            </Button>
          </Form>
          <div className="text-danger font-weight-bold font-weight-italics">The default status is unverified. It will be verified once our experts analyse the documents.</div>
        </Card.Body>
      </Card>
    </div>
  );
}
