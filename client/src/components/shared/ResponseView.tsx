import React, { FC } from "react";
import { Alert, Row } from "react-bootstrap";
import styled from "styled-components";
import { IResponse } from "../../interfaces/IResponse";

const ResponseView: FC<IResponse> = ({ message, statusCode }) => {
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

  return (
    <StyledRow>
      <Alert variant={color}>
        <Alert.Heading>{responseMessage}</Alert.Heading>
        <p>{message}</p>
      </Alert>
    </StyledRow>
  );
};

const StyledRow = styled(Row)`
  padding: 1rem;
  width: 50%;
  margin: 0 auto;
`;

export default ResponseView;
