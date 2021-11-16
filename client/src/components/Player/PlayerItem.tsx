import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IPlayer } from "../../interfaces/IPlayer";
import { API_URL } from "../../utils/Constants";
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
    <Link to={`/player-details/${id}`}>
      <Card className="card-container player-card">
        <div className="card-image-container img-responsive">
          <Card.Img
            variant="top"
            src={`${API_URL}/images/${image}`}
            className="img-fluid"
          />
        </div>
        <Card.Title className="player-card-name">{name}</Card.Title>
        <Card.Text className="player-card-position">{position}</Card.Text>
      </Card>
    </Link>
  );
};

export default PlayerItem;
