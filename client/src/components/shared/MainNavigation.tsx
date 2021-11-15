import { FC } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainNavigation: FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src="https://localhost:5001/images/lfc-logo.png"
            alt="Liverpool Logo"
            width="40"
            height="40"
            style={{ marginRight: ".5rem" }}
            className="d-inline-block align-top"
          />
          LFC-DB
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/players">
              Players
            </Nav.Link>
            <Nav.Link as={Link} to="/staff">
              Staff
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
