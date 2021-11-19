import React, { FC, useContext, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StaffContext } from "../../contexts/StaffContext";
import { IResponse } from "../../interfaces/IResponse";
import { IStaff } from "../../interfaces/IStaff";
import { StaffContextType } from "../../types/StaffContextType";
import { handleError } from "../../utils";
import { API_URL } from "../../utils/Constants";
import Loading from "../shared/Loading";
import ResponseView from "../shared/ResponseView";

const AdminStaffItem: FC<IStaff> = ({
  id,
  name,
  nationality,
  club,
  image,
  dateOfBirth,
  role,
}) => {
  const { deleteStaff } = useContext(StaffContext) as StaffContextType;
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [response, setResponse] = useState<IResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClose = () => setIsPopup(false);
  const handleShow = () => setIsPopup(true);

  const deleteStaffById = async () => {
    console.log("deleted " + id);

    let res;

    if (id) {
      try {
        res = await deleteStaff(id);
      } catch (e: any) {
        handleError(e, setIsLoading, setResponse);
      }
    }
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
      <StyledButtonContainer>
        <Link to={`/admin/staff/edit/${id}`}>
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
            <p>Do you really want to delete {name} ?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              NO
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                deleteStaffById();
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
export default AdminStaffItem;
