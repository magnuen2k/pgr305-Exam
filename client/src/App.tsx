import React from "react";
import { PlayerProvider } from "./contexts/PlayerContext";
import Routing from "./routing/Routing";
import "bootstrap/dist/css/bootstrap.min.css";
import { StaffProvider } from "./contexts/StaffContext";
import { TrophyProvider } from "./contexts/TrophyContext";

function App() {
  return (
    <div className="App">
      <PlayerProvider>
        <StaffProvider>
          <TrophyProvider>
            <Routing />
          </TrophyProvider>
        </StaffProvider>
      </PlayerProvider>
    </div>
  );
}

export default App;
