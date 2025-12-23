import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  Bookmark,
  Copy,
  ZoomIn,
  ZoomOut,
  ArrowRight,
  Info,
} from "lucide-react";
import fatihaData from "../assets/fatiha.json";

const SurahReading = () => {
  const [fontSize, setFontSize] = useState(24);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVerse, setActiveVerse] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  const surah = fatihaData;

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 4, 48));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 4, 16));

  const toggleBookmark = (verseId) => {
    setBookmarks((prev) =>
      prev.includes(verseId)
        ? prev.filter((b) => b !== verseId)
        : [...prev, verseId]
    );
  };

  const copyVerse = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/quran"
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowRight size={20} />
            <span>العودة للمصحف</span>
          </Link>
          <div className="flex items-center gap-4 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
            <button
              onClick={decreaseFontSize}
              className="p-1 hover:bg-emerald-100 rounded-full text-emerald-700 transition-colors"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-emerald-800 font-medium">حجم الخط</span>
            <button
              onClick={increaseFontSize}
              className="p-1 hover:bg-emerald-100 rounded-full text-emerald-700 transition-colors"
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </div>

        {/* Surah Info Card */}
        <div className="bg-emerald-900 text-white rounded-3xl p-8 mb-12 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4 font-arabic">
              سورة {surah.name}
            </h1>
            <div className="flex items-center justify-center gap-6 text-emerald-100">
              <span className="flex items-center gap-2">
                <Info size={16} />
                {surah.type}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                {surah.verses_count} آيات
              </span>
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        </div>

        {/* Bismillah */}
        {surah.id !== 1 && surah.id !== 9 && (
          <div className="text-center mb-12">
            <p className="text-3xl font-arabic text-emerald-900 opacity-90">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        )}

        {/* Verses Container */}
        <div className="space-y-8 pb-24">
          {surah.verses.map((verse) => (
            <div
              key={verse.id}
              className={`p-6 rounded-2xl transition-all duration-300 ${
                activeVerse === verse.id
                  ? "bg-emerald-50 ring-1 ring-emerald-200"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between">
                  {/* Verse Number Badge */}
                  <div className="shrink-0 w-10 h-10 border-2 border-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
                    {verse.id}
                  </div>

                  {/* Verse Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveVerse(
                          verse.id === activeVerse && isPlaying
                            ? null
                            : verse.id
                        );
                        setIsPlaying(
                          verse.id === activeVerse && isPlaying ? false : true
                        );
                      }}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="استماع"
                    >
                      {activeVerse === verse.id && isPlaying ? (
                        <Pause size={20} />
                      ) : (
                        <Play size={20} />
                      )}
                    </button>
                    <button
                      onClick={() => copyVerse(verse.text)}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="نسخ"
                    >
                      <Copy size={20} />
                    </button>
                    <button
                      onClick={() => toggleBookmark(verse.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        bookmarks.includes(verse.id)
                          ? "bg-emerald-100 text-emerald-800"
                          : "text-emerald-600 hover:bg-emerald-50"
                      }`}
                      title="حفظ"
                    >
                      <Bookmark
                        size={20}
                        fill={
                          bookmarks.includes(verse.id) ? "currentColor" : "none"
                        }
                      />
                    </button>
                  </div>
                </div>

                {/* Verse Text */}
                <p
                  className="text-emerald-950 leading-loose font-arabic text-right px-2"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {verse.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Controls */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white shadow-2xl border border-emerald-100 px-8 py-4 rounded-full flex items-center gap-6 z-50">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-emerald-700 text-white rounded-full flex items-center justify-center hover:bg-emerald-800 transition-colors shadow-lg"
          >
            {isPlaying ? (
              <Pause size={24} />
            ) : (
              <Play size={24} fill="currentColor" />
            )}
          </button>
          <div className="h-8 w-px bg-emerald-100"></div>
          <p className="text-emerald-900 font-medium whitespace-nowrap">
            مشغل السورة بالكامل
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurahReading;
