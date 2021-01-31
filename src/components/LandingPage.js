import React from 'react'
import Navbar from './NavBar'
import brown from '../assets/brown.jpeg'
import culture from '../assets/culture.jpg'
import stubble2 from '../assets/stubble2.jpg'
import first from '../assets/first.jpg'
import stubbleburn from '../assets/stubble-burning.jpg'
import stubblenew from '../assets/stubblenew.jpg'
import lab from '../assets/lab.jpg'
import collage from '../assets/collage.png'
import logo from '../assets/2.png'
import {Jumbotron, Card,Carousel} from 'react-bootstrap'
import './landing.css'
export default function LandingPage() {
  return (
    //set photo of background
    <div className="w-100 align-content-center justify-content-center">
      <Navbar />
      <div className="top">
        <div className="head" >
          <div className="text-center h1 text-uppercase heading-primary-main ml-5 mt-5"><img src={logo} alt="logo" style={{ width: "auto", height:"200px",borderRadius:"50%" }}></img><br></br> Operation Agaricus</div>
          <div className="text-center text-uppercase heading-primary">The unexplored territory</div>
        </div>
      </div>
      <div className="div2" >
        <Jumbotron >
          <div className="jumbo">
            <div className="img-fluid">
            <img className="brown "src={collage} alt="some pic" />
            </div>
            <div className="mFarm">
              <h1 className="text-center text-uppercase">Via AGARICUS</h1>
              <p className="text-center">
              Neither mushroom comes in animal or plant kingdom, nor the problems faced by mushroom farmers. <br /> In India,it is one of the most profitable agribusinesses that can be started with minimum investment and space. <br /> Mushroom farming in India is growing gradually as an alternative source of income.<br /> It is time to finally bring the much awaited 'Brown revolution' and also fight against pollution.<br />
              <a href="https://www.tribuneindia.com/news/ludhiana/paddy-straw-can-be-used-for-mushroom-cultivation-experts-167794#:~:text=Paddy%20straw%20can%20be%20used%20conveniently%20for%20making%20'mushroom%20growing,for%20the%20production%20of%20mushrooms">Know More</a>
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
          <Card.Body className="card2">
            <div
              className="row"
            >
              <div className=" pictures col-xl-4 col-md-6 col-12"><img className="features img-fluid" src={culture} alt="some pic" /><br></br>
              <div className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque sit amet nisi ut justo pulvinar suscipit. Mauris
              vulputate magna tortor, sit amet congue lorem efficitur ultrices.
            </div>
              </div>
              <div className=" pictures col-xl-4 col-md-6 col-12"><img className="features img-fluid" src={stubble2} alt="some pic" /><br></br>
              <div className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque sit amet nisi ut justo pulvinar suscipit. Mauris
              vulputate magna tortor, sit amet congue lorem efficitur ultrices.
            </div>
              </div>
              <div className="pictures col-xl-4 col-md-6 col-12"><img className="features img-fluid" src={brown} alt="some pic" /><br></br>
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
      <div className="carousel-outer">
      <div className="spores container">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={first}
            alt="Via Agaricus"
          />
          <Carousel.Caption>
            <h3>Via AGARICUS</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={stubbleburn}
            alt="Burning Stubble"
          />

          <Carousel.Caption>
            <h3>Pollution</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={stubblenew}
            alt="Bundles of stubble"
          />
            <Carousel.Caption>
              <h3>Earn, Don't Burn!</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={lab}
            alt="Lab Inspection"
          />
            <Carousel.Caption>
              <h3 className="text-danger font-weight-bold">No more frauds!</h3>
              <p className="text-danger font-weight-bold">Products and claims of sellers verified by our experts.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      </div>
    </div>
  );
}
