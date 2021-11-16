import React, { FC, useContext, useEffect, useState } from "react";
import { Row, Col, Container, InputGroup, FormControl } from "react-bootstrap";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { PlayerContextType } from "../../types/PlayerContextType";
import FilterOptions from "../FilterOptions";
import PlayerItem from "./PlayerItem";

const PlayerList: FC = () => {
  const { players } = useContext(PlayerContext) as PlayerContextType;
  const [allPlayers, setAllPlayers] = useState<IPlayer[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const createPlayerList = () => {
    // Display either full list of players or filtered copy
    const list = allPlayers.length > 0 ? allPlayers : players;

    return list.map((player: IPlayer, key: number) => {
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

  const handleChange = (e: any) => {
    if (e.target.value === "reset") {
      setAllPlayers(players);
    } else {
      setAllPlayers(
        players.filter((player: IPlayer) => player.position === e.target.value)
      );
    }
  };

  useEffect(() => {
    if (searchText.length === 0) {
      setAllPlayers(players);
    } else {
      let filteredPlayers = allPlayers.filter((p) => {
        const name = p.name.toLowerCase();
        return name.includes(searchText);
      });
      setAllPlayers(filteredPlayers);
    }
  }, [searchText]);

  return (
    <Container>
      <InputGroup>
        <FormControl
          placeholder="Search by player name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>

      <FilterOptions handleChange={handleChange} />
      <Row>{createPlayerList()}</Row>
    </Container>
  );
};

export default PlayerList;
