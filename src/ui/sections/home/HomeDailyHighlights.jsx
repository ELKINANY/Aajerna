import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ScrollText, Sparkles, ChevronLeft, BellRing } from "lucide-react";
import { getAllHadithAsync } from "../../../redux/slices/hadthSlice";
import { fetchPrayerTimesAsync } from "../../../redux/slices/prayerTimesSlice";
import { formatTime12 } from "../../../utils/formatTime";

const prayerNamesAr = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

const HomeDailyHighlights = () => {
  const dispatch = useDispatch();
  const { hadiths, loading: hadithLoading } = useSelector(
    (state) => state.hadith
  );
  const { prayerTimes, error: prayerError } = useSelector(
    (state) => state.prayerTimes
  );

  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    dispatch(getAllHadithAsync());
  }, [dispatch]);

  // Fetch prayer times if not available
  useEffect(() => {
    if (!prayerTimes) {
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
          () => {
            dispatch(fetchPrayerTimesAsync({ lat: 30.0444, lon: 31.2357 }));
          }
        );
      } else {
        dispatch(fetchPrayerTimesAsync({ lat: 30.0444, lon: 31.2357 }));
      }
    }
  }, [dispatch, prayerTimes]);

  const dailyHadith = useMemo(() => {
    if (hadiths?.hadiths?.data?.length > 0) {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      const hadithsArray = hadiths.hadiths.data;
      const index = dayOfYear % hadithsArray.length;
      return hadithsArray[index];
    }
    return null;
  }, [hadiths]);

  const formattedPrayerTimes = useMemo(() => {
    const timings = prayerTimes?.data?.timings || prayerTimes?.timings;
    if (!timings) return [];

    const items = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    return items.map((key) => ({
      id: key,
      name: prayerNamesAr[key],
      time: formatTime12(timings[key]),
    }));
  }, [prayerTimes]);

  useEffect(() => {
    const timings = prayerTimes?.data?.timings || prayerTimes?.timings;
    if (!timings || formattedPrayerTimes.length === 0) return;

    const items = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    const updateNextPrayer = () => {
      const now = new Date();
      let found = false;

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

                {prayerError ? (
                  <div className="py-4">
                    <p className="text-emerald-100/60 text-sm mb-4">
                      فشل تحميل المواقيت
                    </p>
                    <button
                      onClick={() =>
                        dispatch(
                          fetchPrayerTimesAsync({ lat: 30.0444, lon: 31.2357 })
                        )
                      }
                      className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors"
                    >
                      إعادة المحاولة
                    </button>
                  </div>
                ) : nextPrayer ? (
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
                ) : (
                  <div className="py-8">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  </div>
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
                    {(() => {
                      const text =
                        dailyHadith.hadithArabic || dailyHadith.text || "";
                      return text.length > 150
                        ? text.substring(0, 150) + "..."
                        : text;
                    })()}
                  </p>
                </div>
              )}
              {hadithLoading && !dailyHadith && (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-emerald-50 pt-8">
              {dailyHadith?.hadithNarrator || dailyHadith?.narrator ? (
                <div className="flex flex-col">
                  <span className="text-emerald-800/40 text-sm font-medium">
                    الراوي
                  </span>
                  <span className="text-emerald-900 font-bold">
                    {dailyHadith?.hadithNarrator || dailyHadith?.narrator}
                  </span>
                </div>
              ) : (
                <div></div>
              )}
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
