import React from "react";
import { PlayerProvider } from "./contexts/PlayerContext";
import Routing from "./routing/Routing";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <PlayerProvider>
        <Routing />
      </PlayerProvider>
    </div>
  );
}

export default App;
