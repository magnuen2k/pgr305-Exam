import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { IPlayer } from "../../interfaces/IPlayer";

interface AdminEditPlayerFormProps {
  player: IPlayer;
}

const AdminEditPlayerForm: FC<AdminEditPlayerFormProps> = ({ player }) => {
  const [editedPlayer, setEditedPlayer] = useState(player);

  return (
    <div>
      <p>{editedPlayer.name}</p>
    </div>
  );
};

export default AdminEditPlayerForm;
