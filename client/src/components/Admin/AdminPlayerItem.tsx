import React, { FC } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IPlayer } from "../../interfaces/IPlayer";
import { API_URL } from "../../utils/Constants";

const AdminPlayerItem: FC<IPlayer> = ({
  id,
  name,
  club,
  image,
  nationality,
  dateOfBirth,
  position,
}) => {
  const deletePlayer = () => {
    console.log("DELETED: " + id);
  };

  return (
    <Card>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <StyledCardImgContainer>
          <Card.Img
            src={`${API_URL}/images/${image}`}
            className="img-responsive"
          />
        </StyledCardImgContainer>
      </Card.Body>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to={`/admin/players/edit/${id}`}>
          <Button className="mx-3 mb-3">Edit</Button>
        </Link>

        <Button onClick={deletePlayer} className="mx-3 mb-3" variant="danger">
          Delete
        </Button>
      </div>
    </Card>
  );
};

const StyledCardImgContainer = styled.div`
  height: 12rem;
  overflow: hidden;
`;

export default AdminPlayerItem;
