import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  ScrollText,
  Sparkles,
  ChevronLeft,
  BellRing,
} from "lucide-react";
import hadithData from "../../../assets/hadithData.json";
import prayerData from "../../../assets/prayerTimes.json";

const getDailyHadith = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return hadithData[dayOfYear % hadithData.length];
};

const HomeDailyHighlights = () => {
  const [dailyHadith] = useState(getDailyHadith);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    // 2. Setup Prayer Countdown
    const timer = setInterval(() => {
      const timeNow = new Date();
      const currentH = timeNow.getHours();
      const currentM = timeNow.getMinutes();
      const currentTotalMinutes = currentH * 60 + currentM;

      let next = null;
      let minDiff = Infinity;

      prayerData.forEach((prayer) => {
        const [h, m] = prayer.time.split(":").map(Number);
        let prayerTotalMinutes = h * 60 + m;
        let diffMinutes = prayerTotalMinutes - currentTotalMinutes;
        if (diffMinutes <= 0) diffMinutes += 24 * 60;

        if (diffMinutes < minDiff) {
          minDiff = diffMinutes;
          next = { ...prayer, diff: diffMinutes };
        }
      });

      setNextPrayer(next);
      const hours = Math.floor(next.diff / 60);
      const minutes = next.diff % 60;
      const seconds = 59 - timeNow.getSeconds();
      setCountdown(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="py-20 px-6 md:px-16 lg:px-24 bg-[#fcfdfb] font-amiri"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Next Prayer Card */}
          <div className="relative group overflow-hidden bg-emerald-700 rounded-5xl p-10 text-white shadow-2xl shadow-emerald-900/20">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 text-emerald-100/60 mb-8 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full w-fit border border-white/5">
                  <BellRing size={18} className="animate-pulse" />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    الصلاة القادمة
                  </span>
                </div>

                {nextPrayer && (
                  <>
                    <h3 className="text-5xl md:text-6xl font-bold mb-4 font-quran">
                      {nextPrayer.name}
                    </h3>
                    <div className="text-6xl md:text-8xl font-mono font-bold tracking-tighter opacity-100 mb-2">
                      {countdown}
                    </div>
                    <p className="text-emerald-100/60 text-lg font-medium">
                      الوقت المتبقي لرفع أذان {nextPrayer.name}
                    </p>
                  </>
                )}
              </div>

              <Link
                to="/prayer-times"
                className="mt-12 flex items-center gap-2 text-white font-bold group/link"
              >
                <span>الجدول الكامل</span>
                <ChevronLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/20 rounded-full ml-12 mb-12 blur-2xl"></div>
          </div>

          {/* Daily Hadith Preview Card */}
          <div className="bg-white border border-emerald-100 rounded-5xl p-10 md:p-12 shadow-xl shadow-emerald-900/5 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-emerald-600 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <ScrollText size={24} />
                </div>
                <h3 className="text-2xl font-bold font-quran">حديث اليوم</h3>
                <Sparkles size={18} className="text-emerald-400" />
              </div>

              {dailyHadith && (
                <div className="relative">
                  <span className="absolute -top-6 -right-4 text-8xl text-emerald-50 leading-none pointer-events-none">
                    "
                  </span>
                  <p className="text-2xl md:text-3xl font-quran text-emerald-950 leading-relaxed font-bold relative z-10">
                    {dailyHadith.text.length > 150
                      ? dailyHadith.text.substring(0, 150) + "..."
                      : dailyHadith.text}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-emerald-50 pt-8">
              <div className="flex flex-col">
                <span className="text-emerald-800/40 text-sm font-medium">
                  الراوي
                </span>
                <span className="text-emerald-900 font-bold">
                  {dailyHadith?.narrator}
                </span>
              </div>
              <Link
                to="/hadith"
                className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-bold hover:bg-emerald-100 transition-all active:scale-95"
              >
                <span>قراءة الشرح</span>
                <ChevronLeft size={18} />
              </Link>
            </div>

            {/* Background decorative pattern */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-50 rounded-full opacity-50 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDailyHighlights;
