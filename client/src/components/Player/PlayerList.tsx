import React, { FC, useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { PlayerContextType } from "../../types/PlayerContextType";
import PlayerItem from "./PlayerItem";

const PlayerList: FC = () => {
  const { players } = useContext(PlayerContext) as PlayerContextType;

  const createPlayerList = () => {
    return players.map((player: IPlayer, key: number) => {
      return (
        <Col md={6} lg={4} xl={3} className="mt-5">
          <PlayerItem
            key={key}
            id={player.id}
            name={player.name}
            club={player.club}
            image={player.image}
            nationality={player.nationality}
            dateOfBirth={player.dateOfBirth}
            position={player.position}
          />
        </Col>
      );
    });
  };

  return (
    <Container>
      <p>All players</p>
      <Row>{createPlayerList()}</Row>
    </Container>
  );
};

export default PlayerList;
