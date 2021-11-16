import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Container>
      <p>Admin dashboard</p>

      <Link to="/admin/addPlayer">Add a player</Link>
      <Link to="/admin/deletePlayer">Delete player</Link>
      <Link to="/admin/addStaff">Add staff</Link>
    </Container>
  );
};

export default AdminDashboard;
