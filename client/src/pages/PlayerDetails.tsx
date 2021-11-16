import React, { FC, useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { PlayerContext } from "../contexts/PlayerContext";
import { IPlayer } from "../interfaces/IPlayer";
import { PlayerContextType } from "../types/PlayerContextType";

const PlayerDetails: FC = () => {
  const { id } = useParams();

  const { getPlayerById } = useContext(PlayerContext) as PlayerContextType;
  const [player, SetPlayer] = useState<IPlayer>();

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
    <Container>
      <h3>Du har bedt om: {id}</h3>
      <h4>{player?.name}</h4>
    </Container>
  );
};

export default PlayerDetails;
