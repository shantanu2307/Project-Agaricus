//Market-> DropDown //Date
import axios from 'axios';
import React, {useEffect,useRef,useState} from 'react'
import Navbar from './FarmerNavBar'
import {Card,Form, Button,Alert} from 'react-bootstrap'
export default function Prices() {
  useEffect(() => {
    async function something(){
      const response =await axios.post("/getMarket",{});
      console.log(response);
      const x=response.data.map((item,index)=>{
        return <option key={index}>{item.name}</option>
      })
      sdp(x);
    }
    something();
  },[]);

  async function handleSubmit(e){
    e.preventDefault();
    console.log(typeRef.current.value);
    console.log(dateRef.current.value);
    const response =await axios.post('/price',{
      market:typeRef.current.value,
      date:dateRef.current.value
    });
    console.log(response.data);
    setPrice(<div>{response.data.item}</div>)
    setLoading(true);
  }

  const [dp,sdp]=useState("");
  const [price, setPrice]=useState(0);
  const [loading,setLoading]=useState(false);
  const typeRef=useRef();
  const dateRef=useRef();
  return (
    <div>
      <Navbar />
      <Card>
        <Card.Header className="h1 text-center border-0 font-weight-bolder bg-white">
          Price Prediction
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="type">
              <Form.Label className="font-weight-bold">Market:</Form.Label>
              <Form.Control ref={typeRef} as="select">
                {dp}
              </Form.Control>
            </Form.Group>
            <Form.Group id="date">
              <Form.Label className="font-weight-bold">Future Date:</Form.Label>
              <Form.Control ref={dateRef} type="date" required />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
      {loading && (
        <Alert variant="success">
          Your price is {price} Rs.
        </Alert>
      )}
    </div>
  );
}
