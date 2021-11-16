import React from "react";
import { PlayerProvider } from "./contexts/PlayerContext";
import Routing from "./routing/Routing";
import "bootstrap/dist/css/bootstrap.min.css";
import { StaffProvider } from "./contexts/StaffContext";

function App() {
  return (
    <div className="App">
      <PlayerProvider>
        <StaffProvider>
          <Routing />
        </StaffProvider>
      </PlayerProvider>
    </div>
  );
}

export default App;
