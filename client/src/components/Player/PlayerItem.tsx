import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { IPlayer } from "../../interfaces/IPlayer";
import "./Player.css";

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
    <Card className="card-container">
      <div className="card-image-container">
        <Card.Img
          variant="top"
          src={`https://localhost:5001/images/${image}`}
          className="img-fluid"
        />
      </div>
      <Card.Title>{name}</Card.Title>
      <Card.Text>{club}</Card.Text>
      <Card.Text>{nationality}</Card.Text>
      <Card.Text>{dateOfBirth}</Card.Text>
      <Card.Text>{position}</Card.Text>
    </Card>
  );
};

export default PlayerItem;
