import React, { FC } from "react";
import { Container } from "react-bootstrap";
import AdminAddPlayerForm from "../../components/Admin/AdminAddPlayerForm";

const AdminAddPlayer: FC = () => {
  return (
    <Container>
      <p>Add a player</p>
      <AdminAddPlayerForm />
    </Container>
  );
};

export default AdminAddPlayer;
