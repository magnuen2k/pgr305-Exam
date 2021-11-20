import React, { FC, useContext, useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { TrophyContext } from "../../contexts/TrophyContext";
import { ITrophy } from "../../interfaces/ITrophy";
import { IResponse } from "../../interfaces/IResponse";
import { TrophyContextType } from "../../types/TrophyContextType";
import { handleError, handleImageUpload } from "../../utils";
import Loading from "../shared/Loading";
import ResponseView from "../shared/ResponseView";
import styled from "styled-components";

const AdminAddTrophyForm: FC = () => {
  const initialState = {
    tournamentName: "",
    image: "placeholder.png",
    yearsWon: [],
  };

  const [trophy, setTrophy] = useState<ITrophy>(initialState);
  const [file, setFile] = useState<File>();
  const [response, setResponse] = useState<IResponse>();
  const { addTrophy } = useContext(TrophyContext) as TrophyContextType;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [year, setYear] = useState<string>("");
  const [isPopup, setIsPopup] = useState<boolean>(false);

  const handleClose = () => setIsPopup(false);
  const handleShow = () => setIsPopup(true);

  // Upload image to server, if successful, add trophy to database
  const addNewTrophy = async () => {
    if (file) {
      if ((await handleImageUpload(file, setIsLoading, setResponse)) === 201) {
        // Add trophy to database
        let trophyRes;

        // Try to POST new trophy, else handle error
        try {
          trophyRes = await addTrophy(trophy);
          setIsLoading(true);
        } catch (e: any) {
          handleError(e, setIsLoading, setResponse);
        }

        // If POST successful, display message in popup
        if (trophyRes && trophyRes.status === 201) {
          setIsLoading(false);
          setResponse({
            message: "Trophy added successfully",
            statusCode: trophyRes.status,
          });
        }
      }
    }

    // Clear input form
    setTrophy(initialState);
  };

  const addYearWon = () => {
    if (year.length === 4) {
      setTrophy({ ...trophy, yearsWon: [...trophy.yearsWon, parseInt(year)] });
      setYear("");
    } else {
      setIsPopup(true);
    }
  };

  return (
    <div className="mb-2 mt-5">
      <Form>
        <Form.Group>
          <FormControl
            placeholder="Trophy name"
            value={trophy.tournamentName}
            onChange={(e) =>
              setTrophy({ ...trophy, tournamentName: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <FormControl
            type="number"
            placeholder="Years won"
            value={year}
            onChange={(e: any) => setYear(e.target.value)}
          />
          <Button onClick={addYearWon}>Add year won</Button>
          <div>
            {trophy.yearsWon?.map((y, key) => {
              if (key === 0) return <span key={key}>{y}</span>;
              return <span key={key}>, {y}</span>;
            })}
          </div>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="file"
            onChange={(e: any) => {
              setTrophy({ ...trophy, image: e.target.files[0].name });
              setFile(e.target.files[0]);
            }}
          />
          {file ? "" : "You need to select a file to upload"}
        </Form.Group>
        <Button onClick={addNewTrophy} disabled={!file}>
          Add trophy
        </Button>
      </Form>
      <StyledModal show={isPopup} onHide={handleClose}>
        <Modal.Header closeButton onClick={handleClose}></Modal.Header>

        <Modal.Body>
          <p>You have to provide a year with 4 numbers. Got {year.length}.</p>
        </Modal.Body>
      </StyledModal>
      {isLoading && <Loading />}
      {response && (
        <ResponseView
          message={response.message}
          statusCode={response.statusCode}
        />
      )}
    </div>
  );
};

const StyledModal = styled(Modal)`
  margin-top: 30vh;
`;

export default AdminAddTrophyForm;
