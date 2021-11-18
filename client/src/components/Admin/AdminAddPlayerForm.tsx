import axios from "axios";
import React, { FC, useContext, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { IResponse } from "../../interfaces/IResponse";
import { PlayerContextType } from "../../types/PlayerContextType";
import { API_URL, PLAYER_POSITIONS } from "../../utils/Constants";
import { handleError, handleImageUpload } from "../../utils";
import FilterOptions from "../shared/FilterOptions";
import Loading from "../shared/Loading";
import ResponseView from "../shared/ResponseView";

const AdminAddPlayerForm = () => {
  const initialState = {
    name: "",
    club: "Liverpool FC",
    image: "salah.jpeg",
    nationality: "",
    dateOfBirth: new Date(),
    position: "",
  };

  const [player, setPlayer] = useState<IPlayer>(initialState);
  const [file, setFile] = useState<File>();
  const [response, setResponse] = useState<IResponse>();
  const { addPlayer } = useContext(PlayerContext) as PlayerContextType;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Upload image to server, if successful, add player to database
  const addNewPlayer = async () => {
    if (file) {
      if ((await handleImageUpload(file, setIsLoading, setResponse)) === 201) {
        // Add player to database
        let playerRes;

        // Try to POST new player, else handle error
        try {
          playerRes = await addPlayer(player);
          setIsLoading(true);
        } catch (e: any) {
          handleError(e, setIsLoading, setResponse);
        }

        // If POST successful, display message in popup
        if (playerRes && playerRes.status === 201) {
          setIsLoading(false);
          setResponse({
            message: "Player added successfully",
            statusCode: playerRes.status,
          });
        }
      }
    }

    // Clear input form
    setPlayer(initialState);
  };

  const handlePosition = (e: any) => {
    if (e.target.value === "default") {
      setPlayer({ ...player, position: "No position" });
    } else {
      setPlayer({ ...player, position: e.target.value });
    }
  };

  return (
    <div className="mb-2 mt-5">
      <Form>
        <Form.Group>
          <FormControl
            placeholder="Name"
            value={player.name}
            onChange={(e) => setPlayer({ ...player, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <FormControl
            placeholder="Nationality"
            value={player.nationality}
            onChange={(e) =>
              setPlayer({ ...player, nationality: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <FormControl
            placeholder="Nationality"
            type="date"
            onChange={(e) =>
              setPlayer({ ...player, dateOfBirth: new Date(e.target.value) })
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
              setPlayer({ ...player, image: e.target.files[0].name });
              setFile(e.target.files[0]);
            }}
          />
          {file ? "" : "You need to select a file to upload"}
        </Form.Group>
        <Button onClick={addNewPlayer} disabled={!file}>
          Add player
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

export default AdminAddPlayerForm;
