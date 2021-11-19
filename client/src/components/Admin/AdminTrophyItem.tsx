import React, { FC, useContext, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IResponse } from "../../interfaces/IResponse";
import { handleError } from "../../utils";
import { API_URL } from "../../utils/Constants";
import Loading from "../shared/Loading";
import ResponseView from "../shared/ResponseView";
import { ITrophy } from "../../interfaces/ITrophy";
import { TrophyContext } from "../../contexts/TrophyContext";
import { TrophyContextType } from "../../types/TrophyContextType";

const AdminTrophyItem: FC<ITrophy> = ({ id, tournamentName, image }) => {
  const { deleteTrophy } = useContext(TrophyContext) as TrophyContextType;

  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [response, setResponse] = useState<IResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteTrophyById = async () => {
    let res;

    if (id) {
      try {
        res = await deleteTrophy(id);
      } catch (e: any) {
        handleError(e, setIsLoading, setResponse);
      }
    }
  };

  const handleClose = () => setIsPopup(false);
  const handleShow = () => setIsPopup(true);

  return (
    <Card>
      <Card.Header>{tournamentName}</Card.Header>
      <Card.Body>
        <StyledCardImgContainer>
          <Card.Img
            src={`${API_URL}/images/${image}`}
            className="img-responsive"
          />
        </StyledCardImgContainer>
      </Card.Body>
      <StyledButtonContainer>
        <Link to={`/admin/trophies/edit/${id}`}>
          <Button className="mx-3 mb-3">Edit</Button>
        </Link>

        <Button onClick={handleShow} className="mx-3 mb-3" variant="danger">
          Delete
        </Button>

        <StyledModal show={isPopup} onHide={handleClose}>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Do you really want to delete {tournamentName} ?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              NO
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                deleteTrophyById();
                handleClose();
              }}
            >
              YES
            </Button>
          </Modal.Footer>
        </StyledModal>
      </StyledButtonContainer>
      {isLoading && <Loading />}
      {response && (
        <ResponseView
          message={response.message}
          statusCode={response.statusCode}
        />
      )}
    </Card>
  );
};

const StyledCardImgContainer = styled.div`
  height: 12rem;
  overflow: hidden;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledModal = styled(Modal)`
  margin-top: 30vh;
`;

export default AdminTrophyItem;
