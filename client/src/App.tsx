import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { PlayerProvider } from "./contexts/PlayerContext";
import Routing from "./routing/Routing";

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
