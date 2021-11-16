import React, { FC } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IPlayer } from "../../interfaces/IPlayer";
import { API_URL } from "../../utils/Constants";
import { getAge, getSimpleBirthOfDate } from "../../utils/GetAge";

const PlayerDetailCard: FC<IPlayer> = ({
  id,
  name,
  nationality,
  image,
  club,
  position,
  dateOfBirth,
}) => {
  const navigate = useNavigate();

  return (
    <Container className="pt-5">
      <Button variant="danger" onClick={() => navigate(-1)}>
        Go back
      </Button>
      <Card className="mt-5">
        <Card.Header>
          <Card.Title>{name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row md={2} sm={1} className="py-5 mt-2">
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <Card.Img
                src={`${API_URL}/images/${image}`}
                style={{ width: "20rem" }}
                alt={image}
              />
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Card>
                <Card.Header>
                  <Card.Title>Player Details:</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>Name: {name}</Card.Text>
                  <Card.Text>Club: {club}</Card.Text>
                  <Card.Text>
                    Date of birth: {getSimpleBirthOfDate(dateOfBirth)} (age{" "}
                    {getAge(dateOfBirth)})
                  </Card.Text>
                  <Card.Text>Nationality: {nationality}</Card.Text>
                  <Card.Text>Position: {position}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PlayerDetailCard;
