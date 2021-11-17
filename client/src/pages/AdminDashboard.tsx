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
      <Link to="/admin/players">Edit/Delete players</Link>
    </Container>
  );
};

export default AdminDashboard;
