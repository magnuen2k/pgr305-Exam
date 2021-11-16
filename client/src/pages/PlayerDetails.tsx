import React, { FC, useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../contexts/PlayerContext";
import { IPlayer } from "../interfaces/IPlayer";
import { PlayerContextType } from "../types/PlayerContextType";

const PlayerDetails: FC = () => {
  const { id } = useParams();

  const { getPlayerById } = useContext(PlayerContext) as PlayerContextType;
  const [player, SetPlayer] = useState<IPlayer>();

  const navigate = useNavigate();

  useEffect(() => {
    getPlayerFromContext();
  }, []);

  const getPlayerFromContext = () => {
    if (id) {
      const _player = getPlayerById(id);
      SetPlayer(_player);
    }
  };

  const getAge = (dateOfBirth: any) => {
    return Math.abs((new Date(Date.now() - new Date(dateOfBirth).getTime())).getUTCFullYear() - 1970);
  }

  const getSimpleBirthOfDate = (dateOfBirth: any) => {
    return new Date(dateOfBirth).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  return (
      player ?
    <Container className="pt-5">
      <Button variant="danger" onClick={() => navigate(-1)}>
        Go back
      </Button>
      <Card className="mt-5">
        <Card.Header>
          <Card.Title>{player?.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row md={2} sm={1} className="py-5 mt-2">
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <Card.Img
                src={`https://localhost:5001/images/${player?.image}`}
                style={{ width: "20rem" }}
                alt={player?.image}
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
                  <Card.Text>Name: {player?.name}</Card.Text>
                  <Card.Text>Club: {player?.club}</Card.Text>
                  <Card.Text>Date of birth: {getSimpleBirthOfDate(player?.dateOfBirth)} (age {getAge(player?.dateOfBirth)})</Card.Text>
                  <Card.Text>Nationality: {player?.nationality}</Card.Text>
                  <Card.Text>Position: {player?.position}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container> : <Container className="pt-5">
            <Button variant="danger" onClick={() => navigate(-1)}>
              Go back
            </Button>
            <Card className="mt-5">
              <Card.Header>
                <Card.Title>You broke it! Enjoy placeholder Apetor</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row md={2} sm={1} className="py-5 mt-2">
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <Card.Img
                        src={"https://localhost:5001/images/apetor.jpeg"}
                        style={{ width: "20rem" }}
                        alt={"apetor"}
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
                        <Card.Text>Name: Apetor</Card.Text>
                        <Card.Text>Club: Sandefjord</Card.Text>
                        <Card.Text>Date of birth: {getSimpleBirthOfDate("1964-11-01T10:00:00.000+00:00")} (age {getAge("1964-11-01T10:00:00.000+00:00")})</Card.Text>
                        <Card.Text>Nationality: Norway</Card.Text>
                        <Card.Text>Position: The ice</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
  );
};

export default PlayerDetails;