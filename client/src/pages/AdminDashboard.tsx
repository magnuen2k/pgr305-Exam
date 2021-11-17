import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Container>
      <h3 className="mt-5">Admin dashboard</h3>
      <Row md={1} lg={2} xs={1}>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Card className="mt-4" style={{ width: "90%" }}>
            <Card.Header>Players</Card.Header>
            <Button variant="danger" className="m-3">
              <Link to="/admin/addPlayer">Add a player</Link>
            </Button>
            <Button variant="danger" className="m-3">
              <Link to="/admin/players">Manage players</Link>
            </Button>
          </Card>
        </Col>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Card className="mt-4" style={{ width: "90%" }}>
            <Card.Header>Staff</Card.Header>
            <Button variant="danger" className="m-3">
              <Link to="/admin/addStaff">Add staff</Link>
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
