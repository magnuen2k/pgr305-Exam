import React, { FC, useContext, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { PlayerContextType } from "../../types/PlayerContextType";
import { PLAYER_POSITIONS } from "../../utils";
import FilterOptions from "../shared/FilterOptions";
import Loading from "../shared/Loading";
import PlayerItem from "./PlayerItem";

const PlayerList: FC = () => {
  const { players } = useContext(PlayerContext) as PlayerContextType;
  const [allPlayers, setAllPlayers] = useState<IPlayer[]>([]);
  const [filterText, setFilterText] = useState<string>("");

  const createPlayerList = () => {
    // Display either full list of players or filtered copy
    const list = allPlayers.length > 0 ? allPlayers : players;

    return list
      .sort(
        (a, b) =>
          PLAYER_POSITIONS.indexOf(a.position) -
          PLAYER_POSITIONS.indexOf(b.position)
      )
      .map((player: IPlayer, key: number) => {
        return (
          <Col md={6} lg={4} xl={3} className="mt-5" key={key}>
            <PlayerItem
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

  useEffect(() => {
    console.log(filterText);

    if (filterText === "reset") {
      setAllPlayers(players);
    } else {
      setAllPlayers(
        players.filter((player: IPlayer) => player.position === filterText)
      );
    }
  }, [filterText]);

  return (
    <Container className="pt-5" id="players">
      <h3 className="mb-3">Players</h3>

      {players.length <= 0 ? (
        <Loading />
      ) : (
        <>
          <FilterOptions
            handleChange={(e: any) => setFilterText(e.target.value)}
            options={PLAYER_POSITIONS}
          />
          <Row>{createPlayerList()}</Row>
        </>
      )}
    </Container>
  );
};

export default PlayerList;
