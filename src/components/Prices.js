//Market-> DropDown //Date
import axios from 'axios';
import React, {useEffect,useRef,useState} from 'react'
import Navbar from './FarmerNavBar'
import {Card,Form, Button,Alert} from 'react-bootstrap'
import Footer from './Footer'
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
    setDis(true);
    console.log(typeRef.current.value);
    console.log(dateRef.current.value);
    const response =await axios.post('/price',{
      market:typeRef.current.value,
      date:dateRef.current.value
    });
    console.log(response.data);
    setDis(false);
    setPrice(<span>{response.data.item.replaceAll("[","").replaceAll("]","")}</span>)
    setLoading(true)
  }

  const [dp,sdp]=useState("");
  const [price, setPrice]=useState(0);
  const [dis,setDis]=useState(false);
  const [loading,setLoading]=useState(false);
  const typeRef=useRef();
  const dateRef=useRef();
  return (
    <div>
      <Navbar />
      <Card>
        <Card.Header className="h1 text-center text-uppercase border-0 font-weight-bolder bg-white">
          Price Prediction
        </Card.Header>
        {dis && (
          <Alert className="font-weight-bolder h5" variant="primary">
            Loading..
          </Alert>
        )}
        {loading && (
          <Alert variant="success" className="font-weight-bolder h5">
            Your predicted price is &#8377; {price}
          </Alert>
        )}
        <Card.Body>
          <div className="d-flex justify-content-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group id="type">
                <Form.Label className="font-weight-bold">Market:</Form.Label>
                <Form.Control ref={typeRef} as="select">
                  {dp}
                </Form.Control>
              </Form.Group>
              <Form.Group id="date">
                <Form.Label className="font-weight-bold">
                  Future Date:
                </Form.Label>
                <Form.Control ref={dateRef} type="date" required />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button type="submit" className="w-100">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
      <div
        className="w-100"
        style={{ position: "absolute", bottom: "0", maxHeight: "200px" }}
      >
        <Footer />
      </div>
    </div>
  );
}
