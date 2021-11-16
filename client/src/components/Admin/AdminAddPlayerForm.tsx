import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { PlayerContext } from "../../contexts/PlayerContext";
import { IPlayer } from "../../interfaces/IPlayer";
import { PlayerContextType } from "../../types/PlayerContextType";

const AdminAddPlayerForm = () => {
  const initialState = {
    name: "",
    club: "Liverpool FC",
    image: "salah.jpeg",
    nationality: "",
    dateOfBirth: new Date(),
    position: "",
  };

  const positions = ["Keeper", "Defender", "Midfielder", "Forward"];

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
          url: "https://localhost:5001/ImageUpload/SaveImage",
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
          playerRes = addPlayer(player);
        } catch (e) {
          console.log(e);
        }

        console.log(playerRes);

        /* if (playerRes.status === 200) {
          setResponse("Success");
        } */
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
          <Form.Select onChange={handlePosition}>
            <option value="default">-- Choose position --</option>
            {positions.map((pos, key) => (
              <option key={key} value={pos}>
                {pos}
              </option>
            ))}
          </Form.Select>
          {/* <FormControl
            placeholder="Position"
            value={player.position}
            onChange={(e) => setPlayer({ ...player, position: e.target.value })}
          /> */}
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
        <Button onClick={addNewPlayer} disabled={file ? false : true}>
          Add player
        </Button>
      </Form>
    </div>
  );
};

export default AdminAddPlayerForm;