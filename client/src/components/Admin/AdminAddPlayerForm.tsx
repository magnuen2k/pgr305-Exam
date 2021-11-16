import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
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

  const addPlayer = () => {
    console.log(player);

    // Clear input form
    setPlayer(initialState);
  };

  return (
    <div className="mb-2 mt-5">
      <InputGroup>
        <FormControl
          placeholder="Name"
          value={player.name}
          onChange={(e) => setPlayer({ ...player, name: e.target.value })}
        />
        <FormControl
          placeholder="Nationality"
          value={player.nationality}
          onChange={(e) =>
            setPlayer({ ...player, nationality: e.target.value })
          }
        />
        <FormControl
          placeholder="Position"
          value={player.position}
          onChange={(e) => setPlayer({ ...player, position: e.target.value })}
        />
        <Button onClick={addPlayer}>Add player</Button>
      </InputGroup>
    </div>
  );
};

export default AdminAddPlayerForm;
