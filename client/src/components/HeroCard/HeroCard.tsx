import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { API_URL } from "../../utils/Constants";

const HeroCard = () => {
  return (
    <StyledHeroBg>
      <StyledHeroImg
        src={`${API_URL}/images/header-wallpaper-full.png`}
        alt="wallpaper hero"
      />
      <Container>
        <Row className="pt-3 pb-5">
          <StyledCol>
            <StyledCard className="border-0 text-white">
              <Card.Body>
                <StyledCardTitle>LFC-DB</StyledCardTitle>
                <StyledCardText className="mt-3">
                  Welcome to LFC-DB. Here you can see all players, staff and
                  trophies.
                </StyledCardText>
              </Card.Body>
              <StyledCardImg
                src={`${API_URL}/images/header-wallpaper.jpeg`}
                className="shadow mt-4 rounded"
              />
            </StyledCard>
          </StyledCol>
        </Row>
      </Container>
    </StyledHeroBg>
  );
};

const StyledHeroBg = styled.div`
  overflow: hidden;
  height: 32rem;
  position: relative;
  background-color: transparent;
`;

const StyledHeroImg = styled.img`
  position: absolute;
  @media (min-width: 1460px) {
    width: 100%;
  }
`;

const StyledCol = styled(Col)`
  overflow: hidden;
  text-align: center;
`;

const StyledCard = styled(Card)`
  background-color: transparent;
`;

const StyledCardTitle = styled(Card.Title)`
  font-size: 48px;
  font-weight: bold;
`;

const StyledCardText = styled(Card.Text)`
  width: 70%;
  margin: 0 auto;
`;

const StyledCardImg = styled(Card.Img)`
  overflow: hidden;
  width: 55%;
  margin: 0 auto;
`;

export default HeroCard;
