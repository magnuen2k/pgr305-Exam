import React from "react";
import { Container } from "react-bootstrap";
import AdminAddTrophyForm from "../components/Admin/AdminAddTrophyForm";

const AdminAddTrophy = () => {
  return (
    <Container>
      <p>Add a trophy</p>
      <AdminAddTrophyForm />
    </Container>
  );
};

export default AdminAddTrophy;
