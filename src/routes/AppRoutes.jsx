import { Routes,Route } from "react-router-dom";
import Home from "../pages/Home";
import QuranList from "../pages/QuranList";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quran" element={<QuranList />} />
    </Routes>
  )
}

export default AppRoutes
