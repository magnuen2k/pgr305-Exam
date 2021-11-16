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

  return (
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
                  <Card.Text>Date of birth: {player?.dateOfBirth}</Card.Text>
                  <Card.Text>Nationality: {player?.nationality}</Card.Text>
                  <Card.Text>Position: {player?.position}</Card.Text>
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
