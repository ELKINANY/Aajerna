import { useState , useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import {
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  ArrowRight,
  Settings2,
} from "lucide-react";
import fatihaData from "../assets/fatiha.json";
import { getSingleSurahAsync } from "../redux/slices/quranSlice";

const SurahReading = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  const [fontSize, setFontSize] = useState(28);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const {surah , loading} = useSelector((state) => state.quran)

  // const surah = fatihaData;

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 4, 64));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 4, 20));


  useEffect(()=> {
    if (id) {
      dispatch(getSingleSurahAsync(id))
    }
  }, [dispatch, id])

   if (loading || !surah.arabic1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#fcfdfb] py-8 px-4 sm:px-6 lg:px-8 font-amiri"
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link
            to="/quran"
            className="group flex items-center gap-2 text-emerald-800/70 hover:text-emerald-800 transition-all"
          >
            <div className="w-8 h-8 rounded-full border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
              <ArrowRight size={18} />
            </div>
            <span className="font-medium">رجوع</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 text-white rounded-full hover:bg-emerald-800 transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              {isPlaying ? (
                <Pause size={18} />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
              <span className="font-medium text-sm">تشغيل السورة</span>
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2.5 rounded-full border transition-all ${
                showSettings
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "border-emerald-100 text-emerald-800/60 hover:bg-emerald-50"
              }`}
            >
              <Settings2 size={20} />
            </button>
          </div>
        </div>

        {/* Settings Panel (Animated-like appearance) */}
        {showSettings && (
          <div className="mb-8 p-6 bg-white border border-emerald-100 rounded-2xl shadow-sm flex items-center justify-center gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-4">
              <span className="text-emerald-900/60 text-sm font-medium">
                حجم الخط:
              </span>
              <div className="flex items-center gap-2 bg-emerald-50/50 p-1 rounded-xl border border-emerald-100">
                <button
                  onClick={decreaseFontSize}
                  className="p-2 hover:bg-white hover:text-emerald-700 rounded-lg transition-all text-emerald-800/40"
                  title="تصغير"
                >
                  <ZoomOut size={18} />
                </button>
                <div className="w-10 text-center font-bold text-emerald-800">
                  {Math.round((fontSize / 28) * 100)}%
                </div>
                <button
                  onClick={increaseFontSize}
                  className="p-2 hover:bg-white hover:text-emerald-700 rounded-lg transition-all text-emerald-800/40"
                  title="تكبير"
                >
                  <ZoomIn size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Surah Title */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-[0.03]">
            <div className="w-48 h-48 border-12 border-emerald-900 rounded-full rotate-45"></div>
          </div>
          <h1 className="text-6xl font-bold text-emerald-900 mb-2 font-quran tracking-wide">
            {surah.surahNameArabic}
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-emerald-600 to-transparent mx-auto rounded-full"></div>
        </div>

        {/* Bismillah */}
        {surah.surahNo !== 9 && (
          <div className="text-center mb-12">
            <p className="text-4xl font-quran text-emerald-900 leading-relaxed">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        )}

        {/* Main Reading Container */}
  
   <div className="relative bg-white/50 backdrop-blur-sm border border-emerald-100/50 rounded-4xl p-8 md:p-12 shadow-[0_20px_50px_rgba(6,95,70,0.05)]">
    <div className="quran-text" style={{ fontSize: `${fontSize}px` }}>
      {surah.arabic1.map((verseText, index) => (
        <span
          key={index + 1}
          className="inline group transition-colors hover:text-emerald-700"
        >
          {/* Remove Bismillah from first verse if it's already shown separately and it's there in text */}
          {/* For Fatiha, the first verse IS Bismillah. So we handle that logic. */}
          {index === 0 &&
          verseText.includes("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ") &&
          surah.surahNo !== 9
            ? verseText
                .replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "")
                .trim()
            : verseText}
          <span className="verse-marker mx-3 shadow-sm border-emerald-200 group-hover:border-emerald-400 group-hover:bg-emerald-100/50 transition-all font-sans">
            {index + 1}
          </span>{" "}
        </span>
      ))}
    </div>

    {/* Decorative Corner Elements */}
    <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-emerald-900/10 rounded-tl-2xl pointer-events-none"></div>
    <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-emerald-900/10 rounded-tr-2xl pointer-events-none"></div>
    <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-emerald-900/10 rounded-bl-2xl pointer-events-none"></div>
    <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-emerald-900/10 rounded-br-2xl pointer-events-none"></div>
  </div>
        {/* Footer info */}
        <div className="mt-16 text-center text-emerald-800/40 text-sm font-medium">
          <p>صدق الله العظيم</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-12 bg-emerald-100"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-200"></div>
            <div className="h-px w-12 bg-emerald-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurahReading;
