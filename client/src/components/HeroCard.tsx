import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const HeroCard = () => {
  return (
    <Container>
      <Row className="mt-5 mb-5">
        <Col style={{ overflow: "hidden", textAlign: "center" }}>
          <Card className="border-0">
            <Card.Body>
              <Card.Title style={{ fontSize: "48px", fontWeight: "bold" }}>
                LFC-DB
              </Card.Title>
              <Card.Text style={{ width: "70%", margin: "0 auto" }}>
                Quickly design and customize responsive mobile-first sites with
                Bootstrap, the world’s most popular front-end open source
                toolkit, featuring Sass variables and mixins, responsive grid
                system, extensive prebuilt components, and powerful JavaScript
                plugins.
              </Card.Text>
            </Card.Body>
            <Card.Img
              src="https://localhost:5001/images/header-wallpaper.jpeg"
              style={{ overflow: "hidden", width: "55%", margin: "0 auto" }}
              className="shadow mt-2 mb-5 rounded"
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroCard;
