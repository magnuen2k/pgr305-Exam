import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import {
  Players,
  Home,
  Staff,
  AdminDashboard,
  AdminAddPlayer,
  AdminAddStaff,
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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/addPlayer" element={<AdminAddPlayer />} />
        <Route path="/admin/addStaff" element={<AdminAddStaff />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
