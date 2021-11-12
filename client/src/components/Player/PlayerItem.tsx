import React, { FC } from "react";
import { IPlayer } from "../../interfaces/IPlayer";

const PlayerItem: FC<IPlayer> = ({
  id,
  name,
  club,
  image,
  nationality,
  yearBorn,
  position,
}) => {
  return (
    <div>
      <p>{name}</p>
      <p>{club}</p>
    </div>
  );
};

export default PlayerItem;
