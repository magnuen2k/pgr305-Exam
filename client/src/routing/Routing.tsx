import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import {
  Players,
  Home,
  Staff,
  Trophies,
  AdminDashboard,
  AdminAddPlayer,
  AdminAddStaff,
  NotFound,
  AdminPlayers,
  AdminEditPlayer,
} from "../pages";
import PlayerDetails from "../pages/PlayerDetails";

const Routing = () => {
  return (
    <BrowserRouter>
      <MainNavigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="players" element={<Players />} />
        <Route path="/player-details/:id" element={<PlayerDetails />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/trophies" element={<Trophies />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/addPlayer" element={<AdminAddPlayer />} />
        <Route path="/admin/addStaff" element={<AdminAddStaff />} />
        <Route path="/admin/players" element={<AdminPlayers />} />
        <Route path="/admin/players/edit/:id" element={<AdminEditPlayer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
