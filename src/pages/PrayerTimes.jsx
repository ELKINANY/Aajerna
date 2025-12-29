import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../ui/Loader";
import {
  Clock,
  MapPin,
  Sunrise,
  Sun,
  CloudSun,
  Sunset,
  Moon,
  BellRing,
  AlertCircle,
} from "lucide-react";
import backgroundImage from "../assets/images/صلاة-المسلمين.jpg";
import { fetchPrayerTimesAsync } from "../redux/slices/prayerTimesSlice";
import { formatTime12 } from "../utils/formatTime";

const iconMap = {
  Fajr: <Sunrise size={24} />,
  Dhuhr: <Sun size={24} />,
  Asr: <CloudSun size={24} />,
  Maghrib: <Sunset size={24} />,
  Isha: <Moon size={24} />,
};

const prayerNamesAr = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

const PrayerTimes = () => {
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");

  const dispatch = useDispatch();
  const { prayerTimes, loading, error } = useSelector(
    (state) => state.prayerTimes
  );

  // Transform prayer times from API to array format
  const formattedPrayerTimes = useMemo(() => {
    const timings = prayerTimes?.data?.timings || prayerTimes?.timings;
    if (!timings) return [];

    const items = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    return items.map((key) => ({
      id: key,
      name: prayerNamesAr[key],
      time: formatTime12(timings[key]),
      icon: iconMap[key],
    }));
  }, [prayerTimes]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            fetchPrayerTimesAsync({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            })
          );
        },
        (err) => {
          console.error("Geolocation error:", err);
          // Fallback to a default location if needed
          dispatch(fetchPrayerTimesAsync({ lat: 30.0444, lon: 31.2357 })); // Cairo
        }
      );
    } else {
      dispatch(fetchPrayerTimesAsync({ lat: 30.0444, lon: 31.2357 }));
    }
  }, [dispatch]);

  useEffect(() => {
    const timings = prayerTimes?.data?.timings || prayerTimes?.timings;
    if (!timings || formattedPrayerTimes.length === 0) return;

    const items = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    const updateNextPrayer = () => {
      const now = new Date();
      let found = false;

      // Create full date objects for each prayer time today using original 24h times
      const todayPrayers = formattedPrayerTimes.map((p, index) => {
        const originalTime = timings[items[index]];
        const [hours, minutes] = originalTime.split(":").map(Number);
        const prayerDate = new Date();
        prayerDate.setHours(hours, minutes, 0, 0);
        return { ...p, date: prayerDate };
      });

      for (const prayer of todayPrayers) {
        if (prayer.date > now) {
          setNextPrayer(prayer);

          const diff = prayer.date - now;
          const h = Math.floor(diff / 3600000);
          const m = Math.floor((diff % 3600000) / 60000);
          const s = Math.floor((diff % 60000) / 1000);

          setCountdown(
            `${h.toString().padStart(2, "0")}:${m
              .toString()
              .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
          );
          found = true;
          break;
        }
      }

      if (!found) {
        // If all prayers passed today, next is Fajr tomorrow
        const fajr = todayPrayers[0];
        const tomorrowFajr = new Date(fajr.date);
        tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);

        setNextPrayer({ ...fajr, date: tomorrowFajr });

        const diff = tomorrowFajr - now;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        setCountdown(
          `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`
        );
      }
    };

    updateNextPrayer();
    const timer = setInterval(updateNextPrayer, 1000);
    return () => clearInterval(timer);
  }, [formattedPrayerTimes, prayerTimes]);

  const dateInfo = prayerTimes?.data?.date || prayerTimes?.date;
  const hijriDate = dateInfo?.hijri;
  const readableHijri = hijriDate
    ? `${hijriDate.day} ${hijriDate.month.ar} ${hijriDate.year} هـ`
    : "جاري التحميل...";

  if ((loading || !prayerTimes) && !error) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfdfb]">
        <div className="max-w-md p-8 bg-red-50 border border-red-100 rounded-4xl text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-900 mb-2 font-amiri">
            عذراً، حدث خطأ
          </h2>
          <p className="text-red-700 font-medium mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfb] font-amiri" dir="rtl">
      {/* Hero Section */}
      <div className="relative h-80 md:h-100 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-b from-emerald-900/80 via-emerald-900/60 to-emerald-950/90"></div>

        <div className="relative z-10 text-center text-white px-4">
          <div className="flex items-center justify-center gap-2 text-emerald-100/80 mb-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full w-fit mx-auto border border-white/10">
            <MapPin size={16} />
            <span className="text-sm font-medium">موقعك الحالي</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-quran tracking-wide">
            مواقيت الصلاة
          </h1>

          {nextPrayer && (
            <div className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-4xl border border-white/20 shadow-2xl inline-block transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-center gap-3 text-emerald-200 mb-2">
                <BellRing size={20} className="animate-bounce" />
                <span className="text-lg font-medium">
                  الصلاة القادمة: {nextPrayer.name}
                </span>
              </div>
              <div className="text-5xl md:text-7xl font-mono font-bold tracking-tighter text-white drop-shadow-sm">
                {countdown}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-16 relative z-20 pb-20">
        {/* Prayer Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {formattedPrayerTimes.map((prayer) => {
            const isNext = nextPrayer?.id === prayer.id;
            return (
              <div
                key={prayer.id}
                className={`relative group p-6 md:p-8 rounded-4xl border transition-all duration-500 flex flex-col items-center gap-4 ${
                  isNext
                    ? "bg-emerald-700 border-emerald-50 text-white shadow-[0_20px_40px_rgba(4,120,87,0.3)] scale-105 -translate-y-2 z-10"
                    : "bg-white border-emerald-50 text-emerald-900 shadow-[0_10px_30px_rgba(6,95,70,0.03)] hover:border-emerald-200 hover:shadow-[0_15px_35px_rgba(6,95,70,0.08)]"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                    isNext
                      ? "bg-white/20 text-white"
                      : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                  }`}
                >
                  {prayer.icon}
                </div>

                <div className="text-center">
                  <h3
                    className={`text-xl font-bold mb-1 font-quran ${
                      isNext ? "text-emerald-50" : "text-emerald-950"
                    }`}
                  >
                    {prayer.name}
                  </h3>
                  <div
                    className={`text-3xl font-bold tracking-tight ${
                      isNext ? "text-white" : "text-emerald-700"
                    }`}
                  >
                    {prayer.time}
                  </div>
                </div>

                {/* Status indicator */}
                {isNext && (
                  <div className="absolute top-4 left-4">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="mt-12 p-8 bg-emerald-50/50 border border-emerald-100 rounded-4xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-emerald-900 text-lg">
                التاريخ الهجري
              </h4>
              <p className="text-emerald-800/60 font-medium">{readableHijri}</p>
            </div>
          </div>
          <div className="h-px md:h-12 w-full md:w-px bg-emerald-200/50"></div>
          <p className="text-emerald-800/60 text-center md:text-right max-w-md px-4 leading-relaxed font-medium capitalize">
            "الصلاة هي عماد الدين، من أقامها فقد أقام الدين ومن هدمها فقد هدم
            الدين."
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
