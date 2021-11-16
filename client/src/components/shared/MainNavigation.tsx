import { FC } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Scroll from "react-scroll";
import { Link as ScrollLink } from "react-scroll";

const MainNavigation: FC = () => {
  let scroll = Scroll.animateScroll;

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={scrollToTop}
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
            <Nav.Link as={ScrollLink} to="players" spy={true} smooth={true}>
              Players
            </Nav.Link>
            <Nav.Link as={Link} to="/staff">
              Staff
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/admin">
              <Button variant="outline-danger">Admin</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
