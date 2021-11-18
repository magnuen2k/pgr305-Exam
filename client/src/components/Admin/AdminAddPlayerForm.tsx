import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { PlayerContextType } from "../../types/PlayerContextType";
import { API_URL, PLAYER_POSITIONS } from "../../utils/Constants";
import FilterOptions from "../shared/FilterOptions";

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
  const [response, setResponse] = useState<string>("");
  const { addPlayer } = useContext(PlayerContext) as PlayerContextType;

  const addNewPlayer = async () => {
    // Upload image to server, if successful, add player to database

    if (file) {
      let data = new FormData();
      data.append("file", file);
      let res;

      try {
        res = await axios({
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

      if (res?.status === 201) {
        // Add player to database
        let playerRes;

        try {
          playerRes = await addPlayer(player);
        } catch (e: any) {
          if (e.response.status === 404) {
            setResponse("Error component 404"); // TODO: error component
          } else if (e.response.status === 500) {
            setResponse("Error component 500"); // TODO: error component
          }
        }

        if (playerRes && playerRes.status === 201) {
          setResponse("Player added successfully");
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
      <p>{response}</p>
    </div>
  );
};

export default AdminAddPlayerForm;
