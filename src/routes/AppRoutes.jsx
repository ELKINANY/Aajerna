import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import QuranList from "../pages/QuranList";
import Reciters from "../pages/Reciters";
import SurahReading from "../pages/SurahReading";
import AzkarList from "../pages/AzkarList";
import AzkarDetails from "../pages/AzkarDetails";
import PrayerTimes from "../pages/PrayerTimes";
import HadithOfDay from "../pages/HadithOfDay";
import Qibla from "../pages/Qibla";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quran" element={<QuranList />} />
      <Route path="/quran/:id" element={<SurahReading />} />
      <Route path="/reciters/:surahId?" element={<Reciters />} />
      <Route path="/azkar" element={<AzkarList />} />
      <Route path="/azkar/:category" element={<AzkarDetails />} />
      <Route path="/prayer-times" element={<PrayerTimes />} />
      <Route path="/hadith" element={<HadithOfDay />} />
      <Route path="/qibla" element={<Qibla />} />
    </Routes>
  );
}

export default AppRoutes;
