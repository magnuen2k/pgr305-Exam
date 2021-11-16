import axios from "axios";
import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { IPlayer } from "../../interfaces/IPlayer";

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

  const addPlayer = async () => {
    // Upload image to server, if successful, add player to database
    let data = new FormData();

    if (file) {
      data.append("file", file);
    }

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
    }

    console.log(player);

    // Clear input form
    setPlayer(initialState);
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
          <FormControl
            placeholder="Position"
            value={player.position}
            onChange={(e) => setPlayer({ ...player, position: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload an image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e: any) => {
              setPlayer({ ...player, image: e.target.files[0].name });
              setFile(e.target.files[0]);
            }}
          />
        </Form.Group>
        <Button onClick={addPlayer}>Add player</Button>
      </Form>
    </div>
  );
};

export default AdminAddPlayerForm;
