import React from 'react'
import Navbar from './NavBar'
import mushFarm from '../assets/mushFarm.jpg'
import {Jumbotron,Button, Card} from 'react-bootstrap'
import './landing.css'
export default function LandingPage() {
  return (
    //set photo of background
    <div className="w-100 align-content-center justify-content-center">
      <Navbar />
      <div class="top">
        <div class="head" >
          <div className="text-center h1 text-uppercase heading-primary-main">Operation Agaricus</div>
          <div className="text-center text-uppercase heading-primary">Brown Revolution</div>
        </div>
      </div>
      <div class="div2" >
        <Jumbotron >
          <div class="jumbo">
            <div class="img-fluid">
            <img class="brown "src={mushFarm} alt="some pic" />
            </div>
            <div class="mFarm">
              <h1 className="text-center text-uppercase">Mushroom farming</h1>
              <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                rhoncus mollis accumsan. Nam at dui eget libero consectetur
                finibus. Interdum et malesuada fames ac ante ipsum primis in
                faucibus. Vestibulum lobortis eget nisl sit amet sollicitudin.
              </p>
            </div>
          </div>
        </Jumbotron>
      </div>
      
      {/* Tomorrow */}
      <div >
        <Card style={{ backgroundColor: "#fff4c2" }}>
          <Card.Header style={{ backgroundColor: "#fff4c2", border: "none" }}>
            <div className="h1 text-uppercase">SPORES/SPAWNS</div>
          </Card.Header>
          <Card.Body style={{ backgroundColor: "#fff4c2", border: "none" }}>
            <div
              className="justify-content-center d-flex flex-center flex-md-row"
              style={{ gap: "50px" }}
            >
              <div>Image1</div>
              <div>Image2</div>
              <div>Image3</div>
            </div>
          </Card.Body>
          <Card.Footer style={{ backgroundColor: "#fff4c2", border: "none" }}>
            <div className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque sit amet nisi ut justo pulvinar suscipit. Mauris
              vulputate magna tortor, sit amet congue lorem efficitur ultrices.
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
