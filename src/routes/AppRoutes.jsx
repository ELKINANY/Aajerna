import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import QuranList from "../pages/QuranList";
import Reciters from "../pages/Reciters";
import SurahReading from "../pages/SurahReading";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quran" element={<QuranList />} />
      <Route path="/quran/:id" element={<SurahReading />} />
      <Route path="/reciters" element={<Reciters />} />
    </Routes>
  );
}

export default AppRoutes;
