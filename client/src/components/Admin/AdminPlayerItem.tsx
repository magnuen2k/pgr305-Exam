import React, { FC, useContext, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { PlayerContextType } from "../../types/PlayerContextType";
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
  const { deletePlayer } = useContext(PlayerContext) as PlayerContextType;

  const [isPopup, setIsPopup] = useState<boolean>(false);

  const deletePlayerById = async () => {
    console.log("DELETED: " + id);

    let res;

    if (id) {
      try {
        res = await deletePlayer(id);
      } catch (e) {
        console.log(e);
      }

      console.log(res);
    }
  };

  const handleClose = () => setIsPopup(false);
  const handleShow = () => setIsPopup(true);

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

        <Button onClick={handleShow} className="mx-3 mb-3" variant="danger">
          Delete
        </Button>

        <Modal
          show={isPopup}
          onHide={handleClose}
          style={{ "margin-top": "30vh" }}
        >
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Do you really want to delete {name} ?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              NO
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                deletePlayerById();
                handleClose();
              }}
            >
              YES
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Card>
  );
};

const StyledCardImgContainer = styled.div`
  height: 12rem;
  overflow: hidden;
`;

export default AdminPlayerItem;