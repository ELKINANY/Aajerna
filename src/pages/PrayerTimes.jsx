import { useState, useEffect } from "react";
import prayerData from "../assets/prayerTimes.json";
import {
  Clock,
  MapPin,
  Sunrise,
  Sun,
  CloudSun,
  Sunset,
  Moon,
  BellRing,
} from "lucide-react";
import backgroundImage from "../assets/images/صلاة-المسلمين.jpg";

const PrayerTimes = () => {
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const iconMap = {
    sunrise: <Sunrise size={24} />,
    sun: <Sun size={24} />,
    "cloud-sun": <CloudSun size={24} />,
    sunset: <Sunset size={24} />,
    moon: <Moon size={24} />,
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const calculateNextPrayer = () => {
      const now = new Date();
      const currentH = now.getHours();
      const currentM = now.getMinutes();
      const currentTotalMinutes = currentH * 60 + currentM;

      let next = null;
      let minDiff = Infinity;

      prayerData.forEach((prayer) => {
        const [h, m] = prayer.time.split(":").map(Number);
        let prayerTotalMinutes = h * 60 + m;

        let diff = prayerTotalMinutes - currentTotalMinutes;
        if (diff <= 0) diff += 24 * 60; // Next day

        if (diff < minDiff) {
          minDiff = diff;
          next = { ...prayer, diff };
        }
      });

      setNextPrayer(next);

      // Format countdown
      const hours = Math.floor(next.diff / 60);
      const minutes = next.diff % 60;
      const seconds = 59 - now.getSeconds();
      setCountdown(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      );
    };

    calculateNextPrayer();
  }, [currentTime]);

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
            <span className="text-sm font-medium">القاهرة، مصر</span>
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
          {prayerData.map((prayer) => {
            const isNext = nextPrayer?.id === prayer.id;
            return (
              <div
                key={prayer.id}
                className={`relative group p-6 md:p-8 rounded-4xl border transition-all duration-500 flex flex-col items-center gap-4 ${
                  isNext
                    ? "bg-emerald-700 border-emerald-500 text-white shadow-[0_20px_40px_rgba(4,120,87,0.3)] scale-105 -translate-y-2 z-10"
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
                  {iconMap[prayer.icon]}
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
              <p className="text-emerald-800/60 font-medium">
                23 جمادى الآخرة 1447 هـ
              </p>
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
