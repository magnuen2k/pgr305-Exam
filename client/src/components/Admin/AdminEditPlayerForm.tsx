import React, { FC, useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { IResponse } from "../../interfaces/IResponse";
import { PlayerContextType } from "../../types/PlayerContextType";
import { handleError, handleImageUpload, PLAYER_POSITIONS } from "../../utils";
import FilterOptions from "../shared/FilterOptions";
import Loading from "../shared/Loading";
import ResponseView from "../shared/ResponseView";

interface AdminEditPlayerFormProps {
  player: IPlayer;
}

const AdminEditPlayerForm: FC<AdminEditPlayerFormProps> = ({ player }) => {
  const { editPlayer } = useContext(PlayerContext) as PlayerContextType;

  const [editedPlayer, setEditedPlayer] = useState<IPlayer>(player);
  const [newImage, setNewImage] = useState<File>();
  const [response, setResponse] = useState<IResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePosition = (e: any) => {
    setEditedPlayer({ ...editedPlayer, position: e.target.value });
  };

  // Upload image to server, if successful, add edited player to database
  const editNewPlayer = async () => {
    let imgRes;
    if (newImage) {
      imgRes = await handleImageUpload(newImage, setIsLoading, setResponse);
    }

    let playerRes;

    // Try to POST edited player, else handle error
    try {
      playerRes = await editPlayer(editedPlayer);
      setIsLoading(true);
    } catch (e: any) {
      handleError(e, setIsLoading, setResponse);
    }

    // If POST successful, display message in popup
    if (playerRes && playerRes.status === 204) {
      setIsLoading(false);
      setResponse({
        message: `Player edited successfully${
          imgRes === 201 ? ", with new image" : ", without new image"
        }`,
        statusCode: playerRes.status,
      });
    }
  };

  return (
    <div className="mb-2 mt-5">
      <Form>
        <Form.Group>
          <FormControl
            placeholder="Name"
            value={editedPlayer.name}
            onChange={(e) =>
              setEditedPlayer({ ...editedPlayer, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <FormControl
            placeholder="Nationality"
            value={editedPlayer.nationality}
            onChange={(e) =>
              setEditedPlayer({ ...editedPlayer, nationality: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <FormControl
            type="date"
            onChange={(e) =>
              setEditedPlayer({
                ...editedPlayer,
                dateOfBirth: new Date(e.target.value),
              })
            }
          />
        </Form.Group>
        <Form.Group>
          <FilterOptions
            handleChange={handlePosition}
            options={PLAYER_POSITIONS}
            defaultOption={player.position}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="file"
            onChange={(e: any) => {
              setEditedPlayer({
                ...editedPlayer,
                image: e.target.files[0].name,
              });
              setNewImage(e.target.files[0]);
            }}
          />
        </Form.Group>
        <Button onClick={editNewPlayer}>Edit player</Button>
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

export default AdminEditPlayerForm;
