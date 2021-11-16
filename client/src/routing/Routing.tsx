import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import { Players, Home, Staff, AdminDashboard, AdminAddPlayer } from "../pages";
import PlayerDetails from "../pages/PlayerDetails";

const Routing = () => {
  return (
    <BrowserRouter>
      <MainNavigation />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="players" element={<Players />}></Route>
        <Route path="/player-details/:id" element={<PlayerDetails />}></Route>
        <Route path="/staff" element={<Staff />}></Route>
        <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="/admin/addPlayer" element={<AdminAddPlayer />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
