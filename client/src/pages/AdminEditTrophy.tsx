import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { TrophyContext } from "../contexts/TrophyContext";
import { TrophyContextType } from "../types/TrophyContextType";
import { ITrophy } from "../interfaces/ITrophy";
import AdminEditTrophyForm from "../components/Admin/AdminEditTrophyForm";

const AdminEditTrophy = () => {
  const { id } = useParams();

  const { getTrophyById } = useContext(TrophyContext) as TrophyContextType;
  const [trophy, setTrophy] = useState<ITrophy>();

  useEffect(() => {
    getTrophyFromContext();
  }, []);

  const getTrophyFromContext = () => {
    if (id) {
      const _trophy = getTrophyById(id);
      setTrophy(_trophy);
    }
  };

  return trophy ? (
    <Container>
      <AdminEditTrophyForm trophy={trophy} />
    </Container>
  ) : (
    <div>Unable to edit trophy</div>
  );
};

export default AdminEditTrophy;
