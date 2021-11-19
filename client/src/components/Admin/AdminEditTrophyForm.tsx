import React, { FC, useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { IResponse } from "../../interfaces/IResponse";
import { handleError, handleImageUpload } from "../../utils";
import Loading from "../shared/Loading";
import ResponseView from "../shared/ResponseView";
import { ITrophy } from "../../interfaces/ITrophy";
import { TrophyContext } from "../../contexts/TrophyContext";
import { TrophyContextType } from "../../types/TrophyContextType";

interface AdminEditTrophyFormProps {
  trophy: ITrophy;
}

const AdminEditTrophyForm: FC<AdminEditTrophyFormProps> = ({ trophy }) => {
  const { editTrophy } = useContext(TrophyContext) as TrophyContextType;

  const [editedTrophy, setEditedTrophy] = useState<ITrophy>(trophy);
  const [newImage, setNewImage] = useState<File>();
  const [response, setResponse] = useState<IResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /*  const handlePosition = (e: any) => {
    setEditedTrophy({ ...editedTrophy, position: e.target.value });
  };*/

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
        {/*          <Form.Group>             array stuff
            <FormControl
                placeholder="Nationality"
                value={editedTrophy.yearsWon}
                onChange={(e) =>
                    setEditedTrophy({ ...editedTrophy, yearsWon: e.target.value })
                }
            />
          </Form.Group>*/}

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

export default AdminEditTrophyForm;
