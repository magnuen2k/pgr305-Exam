import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import { Players, Home } from "../pages";

const Routing = () => {
  return (
    <BrowserRouter>
      <MainNavigation />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="players" element={<Players />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
