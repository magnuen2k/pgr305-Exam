import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const Loading = () => {
  return (
    <StyledContainer>
      <Spinner animation="border" variant="secondary" className="mb-3" />
      <p>Loading</p>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 4rem;
`;

export default Loading;
