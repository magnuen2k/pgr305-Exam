import React, { FC, useState } from "react";
import { Alert, Modal } from "react-bootstrap";
import styled from "styled-components";
import { IResponse } from "../../interfaces/IResponse";

const ResponseView: FC<IResponse> = ({ message, statusCode }) => {
  const [isPopup, setIsPopup] = useState<boolean>(true);
  let responseMessage;
  let color;

  if (statusCode >= 200 && statusCode < 300) {
    responseMessage = "Success";
    color = "success";
  } else if (statusCode >= 400) {
    responseMessage = "Failed";
    color = "danger";
  } else if (statusCode === 0) {
    responseMessage = "No response";
    color = "danger";
  } else {
    responseMessage = "Unknown response";
    color = "warning";
  }

  const handleClose = () => setIsPopup(false);
  const handleShow = () => setIsPopup(true);

  return (
    <StyledModal show={isPopup} onHide={handleClose}>
      <Modal.Header closeButton onClick={handleClose}></Modal.Header>
      <Modal.Body>
        <Alert variant={color}>
          <Alert.Heading>{responseMessage}</Alert.Heading>
          <p>{message}</p>
        </Alert>
      </Modal.Body>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  margin-top: 30vh;
`;

export default ResponseView;
