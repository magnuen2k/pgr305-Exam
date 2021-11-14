import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import { Players } from "../pages";

const Routing = () => {
  return (
    <BrowserRouter>
      <MainNavigation />

      <Routes>
        <Route path="players" element={<Players />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
