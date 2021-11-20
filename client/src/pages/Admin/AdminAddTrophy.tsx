import React, { FC } from "react";
import { Container } from "react-bootstrap";
import AdminAddTrophyForm from "../../components/Admin/AdminAddTrophyForm";

const AdminAddTrophy: FC = () => {
  return (
    <Container>
      <p>Add a trophy</p>
      <AdminAddTrophyForm />
    </Container>
  );
};

export default AdminAddTrophy;
