import React from 'react'
import Navbar from './FarmerNavBar'
import {Card} from 'react-bootstrap'
export default function Prices() {
  return (
    <div>
      <Navbar />
      <Card>
        <Card.Header className="h1 text-center border-0 font-weight-bolder bg-white">Price Prediction</Card.Header>
      </Card>
    </div>
  )
}
