import React, { FC, useContext, useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { IResponse } from "../../interfaces/IResponse";
import { handleError, handleImageUpload } from "../../utils";
import Loading from "../shared/Loading";
import ResponseView from "../shared/ResponseView";
import { ITrophy } from "../../interfaces/ITrophy";
import { TrophyContext } from "../../contexts/TrophyContext";
import { TrophyContextType } from "../../types/TrophyContextType";
import styled from "styled-components";

interface AdminEditTrophyFormProps {
  trophy: ITrophy;
}

const AdminEditTrophyForm: FC<AdminEditTrophyFormProps> = ({ trophy }) => {
  const { editTrophy } = useContext(TrophyContext) as TrophyContextType;

  const [editedTrophy, setEditedTrophy] = useState<ITrophy>(trophy);
  const [newImage, setNewImage] = useState<File>();
  const [response, setResponse] = useState<IResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [year, setYear] = useState<string>("");
  const [isPopup, setIsPopup] = useState<boolean>(false);

  const handleClose = () => setIsPopup(false);
  const handleShow = () => setIsPopup(true);

  // Upload image to server, if successful, add edited trophy to database

  const editNewTrophy = async () => {
    let imgRes;
    if (newImage) {
      imgRes = await handleImageUpload(newImage, setIsLoading, setResponse);
    }

    let trophyRes;

    // Try to POST edited trophy, else handle error
    try {
      trophyRes = await editTrophy(editedTrophy);
      setIsLoading(true);
    } catch (e: any) {
      handleError(e, setIsLoading, setResponse);
    }

    // If POST successful, display message in popup
    if (trophyRes && trophyRes.status === 204) {
      setIsLoading(false);
      setResponse({
        message: `Trophy edited successfully${
          imgRes === 201 ? ", with new image" : ", without new image"
        }`,
        statusCode: trophyRes.status,
      });
    }
  };

  const addYearWon = () => {
    if (year.length === 4) {
      setEditedTrophy({
        ...editedTrophy,
        yearsWon: [...editedTrophy.yearsWon, parseInt(year, 10)],
      });
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
            placeholder="Name"
            value={editedTrophy.tournamentName}
            onChange={(e) =>
              setEditedTrophy({
                ...editedTrophy,
                tournamentName: e.target.value,
              })
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
            {editedTrophy.yearsWon?.map((y, key) => {
              return (
                <div key={key}>
                  <span>{y} - </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setEditedTrophy({
                        ...editedTrophy,
                        yearsWon: editedTrophy.yearsWon.filter(
                          (yw) => yw !== y
                        ),
                      })
                    }
                  >
                    Remove
                  </span>
                </div>
              );
            })}
          </div>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="file"
            onChange={(e: any) => {
              setEditedTrophy({
                ...editedTrophy,
                image: e.target.files[0].name,
              });
              setNewImage(e.target.files[0]);
            }}
          />
        </Form.Group>
        <Button onClick={editNewTrophy}>Edit trophy</Button>
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

export default AdminEditTrophyForm;
