import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "./home.css";
import "../login/login.css";
import "../../index.css";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import slide1 from "../../slideshow/slide1.jpg";
import slide2 from "../../slideshow/slide2.jpg";
import slide3 from "../../slideshow/slide3.jpg";
import loan from "../../icons/loan.png";

const Home = () => {
  const clicked = (event) => {
    window.location.replace(`/${event.target.name}`);
  };

  return (
    <>
      <Header />
      <Container className="bg-dark p-md-5 p-2 mt-2">
        <h1 className="center p-2">
          <img src={loan} alt="logo" className="img_size"></img> PeerSafe Capital
        </h1>
        <Row>
          <Col lg={{ span: 7 }} md={{ span: 12 }} sm={{ span: 12 }}>
            <Carousel fade controls={false}>
              <Carousel.Item>
                <img
                  className=" w-100 img_size"
                  src={slide1}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className=" w-100 img_size"
                  src={slide2}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="w-100 img_size"
                  src={slide3}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col className="center">
            <h3 className="desc center p-2 mt-5">
              <h2>“What goes around, comes around.”</h2> Presenting to all of
              you, <br></br> a platform that runs solely <br></br>“by the
              people” and <br></br> “for the people” <br></br>avoiding any
              intermediators.<br></br> Need a loan? Take one. <br></br>Don’t?
              Give one away.{" "}
            </h3>
            <div className="d-grid gap-2"></div>
          </Col>
          <Row>
            <Col lg={{ span: 7 }} md={{ span: 12 }} sm={{ span: 12 }}>
              <div className="d-grid gap-2">
                <button
                  name="login"
                  variant="primary"
                  size="lg"
                  className="button_bg p-2 mt-5 mb-2"
                  onClick={clicked}
                >
                  Ask for Loan
                </button>
              </div>
            </Col>
            <Col>
              <div className="d-grid gap-2">
                <button
                  name="market"
                  variant="primary"
                  size="lg"
                  onClick={clicked}
                  className="button_bg p-2 mt-5 mb-2"
                >
                  Give a Loan
                </button>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
