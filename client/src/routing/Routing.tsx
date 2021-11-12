import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Players } from "../pages";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="players" element={<Players />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
