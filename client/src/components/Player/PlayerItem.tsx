import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IPlayer } from "../../interfaces/IPlayer";
import { API_URL } from "../../utils";
import styled from "styled-components";

const PlayerItem: FC<IPlayer> = ({
  id,
  name,
  club,
  image,
  nationality,
  dateOfBirth,
  position,
}) => {
  return (
    <Link to={`/player-details/${id}`}>
      <StyledCardContainer>
        <StyledCardImgContainer>
          <Card.Img
            variant="top"
            src={`${API_URL}/images/${image}`}
            className="img-fluid"
          />
        </StyledCardImgContainer>
        <StyledPlayerCardName>{name}</StyledPlayerCardName>
        <StyledPlayerCardPosition>{position}</StyledPlayerCardPosition>
      </StyledCardContainer>
    </Link>
  );
};

const StyledCardImgContainer = styled.div`
  height: 20rem;
  overflow: hidden;
  transition: 0.1s ease;
  transition: all linear 0.25s;
`;

const StyledPlayerCardName = styled(Card.Title)`
  position: absolute;
  left: 10px;
  bottom: 20px;
  font-size: 20px;
  color: #fff;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
  font-weight: bold;
  transition: all linear 0.25s;
`;

const StyledCardContainer = styled(Card)`
  transition: 0.1s ease;
  cursor: pointer;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
  background-position: center;
  overflow: hidden;
  position: relative;
  margin: 10px auto;
  cursor: pointer;
  &:hover {
    transform: scale(1.01);
  }
  &:hover ${StyledCardImgContainer} {
    filter: grayscale(100%);
  }
  &:hover ${StyledPlayerCardName} {
    bottom: 25px;
  }
`;

const StyledPlayerCardPosition = styled(Card.Text)`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: #fff;
  font-size: 13px;
  transition: all linear 0.25s;
`;

export default PlayerItem;
