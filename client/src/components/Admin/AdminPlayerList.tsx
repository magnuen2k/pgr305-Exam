import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { PlayerContextType } from "../../types/PlayerContextType";
import Loading from "../shared/Loading";
import AdminPlayerItem from "./AdminPlayerItem";
import { PLAYER_POSITIONS } from "../../utils";

const AdminPlayerList = () => {
  const { players } = useContext(PlayerContext) as PlayerContextType;

  const createPlayerList = () => {
    return players
      .sort(
        (a, b) =>
          PLAYER_POSITIONS.indexOf(a.position) -
          PLAYER_POSITIONS.indexOf(b.position)
      )
      .map((player: IPlayer, key: number) => {
        return (
          <Col md={6} lg={4} xl={3} className="mt-5" key={key}>
            <AdminPlayerItem
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
    <Container className="pt-5" id="players">
      <h3 className="mb-3">Manage players</h3>
      {players.length <= 0 ? <Loading /> : <Row>{createPlayerList()}</Row>}
    </Container>
  );
};

export default AdminPlayerList;
