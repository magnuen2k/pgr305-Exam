import React, { FC, useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import styled from "styled-components";
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
  const [filteredPlayers, setFilteredPlayers] = useState<IPlayer[]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setAllPlayers(players);
    setFilteredPlayers(players);
  }, [players]);

  const createPlayerList = () => {
    // Display either full list of players or filtered copy
    //const list = allPlayers.length > 0 ? allPlayers : players;

    return allPlayers
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

  const filterByPosition = (e: any) => {
    setFilterText(e.target.value);
    if (e.target.value === "reset") {
      setAllPlayers(players);
      setFilteredPlayers(players);
    } else {
      setAllPlayers(
        players.filter((player: IPlayer) => player.position === e.target.value)
      );
      setFilteredPlayers(
        players.filter((player: IPlayer) => player.position === e.target.value)
      );
    }
  };

  const searchByName = (text: string) => {
    if (text.length === 0) {
      setAllPlayers(filteredPlayers);
    } else {
      const filtered = filteredPlayers.filter((p) => {
        const name = p.name.toLowerCase();
        return name.includes(text);
      });

      setAllPlayers(filtered);
    }
  };

  return (
    <Container className="pt-5" id="players">
      <h3 className="mb-3">Players</h3>

      {players.length <= 0 ? (
        <Loading />
      ) : (
        <>
          <InputGroup>
            <FormControl
              placeholder="Search by player name"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                searchByName(e.target.value);
              }}
            />
          </InputGroup>
          <FilterOptions
            handleChange={filterByPosition}
            options={PLAYER_POSITIONS}
          />
          <StyledP>Found: {allPlayers.length}</StyledP>
          <Row>{createPlayerList()}</Row>
        </>
      )}
    </Container>
  );
};

const StyledP = styled.p`
  display: inline-block;
  margin-bottom: 0;
  margin-top: 1rem;
`;

export default PlayerList;
