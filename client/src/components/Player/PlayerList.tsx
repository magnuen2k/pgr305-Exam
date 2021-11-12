import React, { FC, useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { PlayerContextType } from "../../types/PlayerContextType";
import PlayerItem from "./PlayerItem";

const PlayerList: FC = () => {
  const { players } = useContext(PlayerContext) as PlayerContextType;

  const createPlayerList = () => {
    return players.map((player: IPlayer, key: number) => {
      return (
        <PlayerItem
          key={key}
          id={player.id}
          name={player.name}
          club={player.club}
          image={player.image}
          nationality={player.nationality}
          yearBorn={player.yearBorn}
          position={player.position}
        />
      );
    });
  };

  return (
    <section>
      <p>All players</p>
      {createPlayerList()}
    </section>
  );
};

export default PlayerList;
