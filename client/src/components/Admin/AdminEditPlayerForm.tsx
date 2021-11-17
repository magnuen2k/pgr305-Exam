import axios from "axios";
import React, { FC, useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { PlayerContextType } from "../../types/PlayerContextType";
import { API_URL, PLAYER_POSITIONS } from "../../utils/Constants";
import FilterOptions from "../FilterOptions";

interface AdminEditPlayerFormProps {
  player: IPlayer;
}

const AdminEditPlayerForm: FC<AdminEditPlayerFormProps> = ({ player }) => {
  const { editPlayer } = useContext(PlayerContext) as PlayerContextType;

  const [editedPlayer, setEditedPlayer] = useState(player);
  const [newImage, setNewImage] = useState<File>();
  const [response, setReponse] = useState<string>("");

  const handlePosition = (e: any) => {
    setEditedPlayer({ ...editedPlayer, position: e.target.value });
  };

  const editNewPlayer = async () => {
    console.log(editedPlayer);

    if (newImage) {
      let data = new FormData();
      data.append("file", newImage);

      let imgRes;

      try {
        imgRes = await axios({
          method: "POST",
          url: `${API_URL}/ImageUpload/SaveImage`,
          data: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (e) {
        console.log(e);
      }
    }

    let playerRes;

    try {
      playerRes = await editPlayer(editedPlayer);
    } catch (e) {
      console.log(e);
    }

    if (playerRes && playerRes.status === 204) {
      setReponse("Edited player successfully");
    }

    console.log(playerRes);
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
      <p>{response}</p>
    </div>
  );
};

export default AdminEditPlayerForm;
