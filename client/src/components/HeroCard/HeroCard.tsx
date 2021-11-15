import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./HeroCard.css";

const HeroCard = () => {
  return (
    <div className="hero-bg hero-bg-color">
      <img
        className="hero-img"
        src="https://localhost:5001/images/header-wallpaper-full.png"
        alt="wallpaper hero"
      />
      <Container>
        <Row className="pt-3 pb-5">
          <Col style={{ overflow: "hidden", textAlign: "center" }}>
            <Card
              className="border-0 text-white"
              style={{ backgroundColor: "transparent" }}
            >
              <Card.Body>
                <Card.Title style={{ fontSize: "48px", fontWeight: "bold" }}>
                  LFC-DB
                </Card.Title>
                <Card.Text
                  className="mt-3"
                  style={{ width: "70%", margin: "0 auto" }}
                >
                  Welcome to LFC-DB. Here you can see all players, staff and
                  trophies.
                </Card.Text>
              </Card.Body>
              <Card.Img
                src="https://localhost:5001/images/header-wallpaper.jpeg"
                style={{ overflow: "hidden", width: "55%", margin: "0 auto" }}
                className="shadow mt-4 rounded"
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroCard;
