import React, { FC, useContext, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { TrophyContext } from "../../contexts/TrophyContext";
import { ITrophy } from "../../interfaces/ITrophy";
import { IResponse } from "../../interfaces/IResponse";
import { TrophyContextType } from "../../types/TrophyContextType";
import { handleError, handleImageUpload } from "../../utils";
import Loading from "../shared/Loading";
import ResponseView from "../shared/ResponseView";

const AdminAddTrophyForm = () => {
  const initialState = {
    tournamentName: "",
    image: "default.jpeg",
    yearsWon: [1994, 1995],
  };

  const [trophy, setTrophy] = useState<ITrophy>(initialState);
  const [file, setFile] = useState<File>();
  const [response, setResponse] = useState<IResponse>();
  const { addTrophy } = useContext(TrophyContext) as TrophyContextType;
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        {/*        <Form.Group> trenger å kunne deale med array greier her
          <FormControl
            placeholder="Nationality"
            value={trophy.nationality}
            onChange={(e) =>
              setTrophy({ ...trophy, nationality: e.target.value })
            }
          />
        </Form.Group>*/}
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

export default AdminAddTrophyForm;
