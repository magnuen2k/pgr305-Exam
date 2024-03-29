import React, { FC, useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AdminEditPlayerForm from "../../components/Admin/AdminEditPlayerForm";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { PlayerContextType } from "../../types/PlayerContextType";

const AdminEditPlayer: FC = () => {
  const { id } = useParams();

  const { getPlayerById } = useContext(PlayerContext) as PlayerContextType;
  const [player, setPlayer] = useState<IPlayer>();

  useEffect(() => {
    getPlayerFromContext();
  }, []);

  const getPlayerFromContext = () => {
    if (id) {
      const _player = getPlayerById(id);
      setPlayer(_player);
    }
  };

  return player ? (
    <Container>
      <AdminEditPlayerForm player={player} />
    </Container>
  ) : (
    <div>Unable to edit player</div>
  );
};

export default AdminEditPlayer;
