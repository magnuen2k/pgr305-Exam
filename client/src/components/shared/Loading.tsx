import React, { FC } from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

// Loading component with spinner to show while waiting for database requests
const Loading: FC = () => {
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
