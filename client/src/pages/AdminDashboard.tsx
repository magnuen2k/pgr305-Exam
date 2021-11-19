import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h3 className="mt-5">Admin dashboard</h3>
      <Row md={1} lg={2} xs={1}>
        <StyledCol>
          <StyledCard className="mt-4">
            <Card.Header>Players</Card.Header>
            <Button
              variant="danger"
              className="m-3"
              onClick={() => navigate("/admin/addPlayer")}
            >
              Add a player
            </Button>
            <Button
              variant="danger"
              className="m-3"
              onClick={() => navigate("/admin/players")}
            >
              Manage players
            </Button>
          </StyledCard>
        </StyledCol>
        <StyledCol>
          <StyledCard className="mt-4">
            <Card.Header>Staff</Card.Header>
            <Button
              variant="danger"
              className="m-3"
              onClick={() => navigate("/admin/addStaff")}
            >
              Add staff
            </Button>
            <Button
              variant="danger"
              className="m-3"
              onClick={() => navigate("/admin/staff")}
            >
              Manage staff
            </Button>
          </StyledCard>
        </StyledCol>
        <StyledCol>
          <StyledCard className="mt-4">
            <Card.Header>Trophies</Card.Header>
            <Button
              variant="danger"
              className="m-3"
              onClick={() => navigate("/admin/addTrophy")}
            >
              Add trophies
            </Button>
          </StyledCard>
        </StyledCol>
      </Row>
    </Container>
  );
};

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  width: 90%;
`;

export default AdminDashboard;
