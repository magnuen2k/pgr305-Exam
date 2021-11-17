import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminEditPlayerForm from "../components/Admin/AdminEditPlayerForm";
import { PlayerContext } from "../contexts/PlayerContext";
import { IPlayer } from "../interfaces/IPlayer";
import { PlayerContextType } from "../types/PlayerContextType";

const AdminEditPlayer = () => {
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
    <AdminEditPlayerForm player={player} />
  ) : (
    <div>Unable to edit player</div>
  );
};

export default AdminEditPlayer;
