import React, { FC, useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { PlayerContextType } from "../../types/PlayerContextType";
import Loading from "../shared/Loading";
import AdminPlayerItem from "./AdminPlayerItem";
import { PLAYER_POSITIONS } from "../../utils";
import styled from "styled-components";

const AdminPlayerList: FC = () => {
  const { players } = useContext(PlayerContext) as PlayerContextType;
  const [filteredPlayers, setFilteredPlayers] = useState<IPlayer[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setFilteredPlayers(players);
  }, [players]);

  const createPlayerList = () => {
    return filteredPlayers
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

  const searchByName = (text: string) => {
    if (text.length === 0) {
      setFilteredPlayers(players);
    } else {
      const filtered = players.filter((p) => {
        const name = p.name.toLowerCase();
        return name.includes(text);
      });

      setFilteredPlayers(filtered);
    }
  };

  const resetSearch = () => {
    setFilteredPlayers(players);
    setSearchText("");
  };

  return (
    <Container className="pt-5" id="players">
      <h3 className="mb-3">Manage players</h3>
      <InputGroup>
        <FormControl
          placeholder="Search by player name"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            searchByName(e.target.value);
          }}
        />
        <Button variant="light" onClick={resetSearch}>
          Reset search
        </Button>
      </InputGroup>
      <StyledP>Found: {filteredPlayers.length}</StyledP>
      {players.length <= 0 ? <Loading /> : <Row>{createPlayerList()}</Row>}
    </Container>
  );
};

const StyledP = styled.p`
  display: inline-block;
  margin-bottom: 0;
  margin-top: 1rem;
`;

export default AdminPlayerList;
