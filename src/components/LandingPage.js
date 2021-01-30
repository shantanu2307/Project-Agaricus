import React from 'react'
import Navbar from './NavBar'
import mushFarm from '../assets/mushFarm.jpg'
import culture from '../assets/culture.jpg'
import burn from '../assets/burn.jpg'
import collage from '../assets/collage.png'
import logo from '../assets/2.png'
import {Jumbotron,Button, Card,Carousel} from 'react-bootstrap'
import './landing.css'
export default function LandingPage() {
  return (
    //set photo of background
    <div className="w-100 align-content-center justify-content-center">
      <Navbar />
      <div className="top">
        <div className="head" >
          <div className="text-center h1 text-uppercase heading-primary-main ml-9"><img src={logo} style={{ width: "auto", height:"200px",borderRadius:"50%" }}></img><br></br> Operation Agaricus</div>
          <div className="text-center text-uppercase heading-primary">Brown Revolution</div>
        </div>
      </div>
      <div className="div2" >
        <Jumbotron >
          <div className="jumbo">
            <div className="img-fluid">
            <img className="brown "src={collage} alt="some pic" />
            </div>
            <div className="mFarm">
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
      <div>
        <Card className="cards">
          <Card.Header className="card-header">
            <div className="h1 text-uppercase">How we work</div>
          </Card.Header>
          <Card.Body className="card-body">
            <div
              className="justify-content-center d-flex flex-center flex-md-row"
              style={{ gap: "5%" }}
            >
              <div><img className="features" src={culture} alt="some pic" /><br></br>
              <div className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque sit amet nisi ut justo pulvinar suscipit. Mauris
              vulputate magna tortor, sit amet congue lorem efficitur ultrices.
            </div>
              </div>
              <div><img className="features" src={burn} alt="some pic" /><br></br>
              <div className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque sit amet nisi ut justo pulvinar suscipit. Mauris
              vulputate magna tortor, sit amet congue lorem efficitur ultrices.
            </div>
              </div>
              <div><img className="features" src={mushFarm} alt="some pic" /><br></br>
              <div className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque sit amet nisi ut justo pulvinar suscipit. Mauris
              vulputate magna tortor, sit amet congue lorem efficitur ultrices.
            </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="spores">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={burn}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={burn}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={burn}
            alt="Third slide"
          />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}
