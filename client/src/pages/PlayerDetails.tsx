import React, { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import PlayerDetailCard from "../components/Player/PlayerDetailCard";
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

  return player ? (
    <PlayerDetailCard
      id={player?.id}
      name={player?.name}
      nationality={player?.nationality}
      image={player?.image}
      club={player?.club}
      position={player?.position}
      dateOfBirth={player?.dateOfBirth}
    />
  ) : (
    <PlayerDetailCard
      id={""}
      name={"You broke it! Enjoy placeholder Apetor"}
      nationality={"Norway"}
      image={"apetor.jpeg"}
      club={"Sandefjord"}
      position={"The ice"}
      dateOfBirth={new Date("1964-11-01T10:00:00.000+00:00")}
    />
  );
};

export default PlayerDetails;
