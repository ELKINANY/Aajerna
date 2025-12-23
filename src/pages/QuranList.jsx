import { Play, BookOpen } from "lucide-react";
import { surahs } from "../assets/surahData";

const QuranList = () => {
  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">القرآن الكريم</h1>
          <p className="text-emerald-700 text-lg">قائمة السور الكريمة</p>
        </div>

        <div className="grid gap-6">
          {surahs.map((surah) => (
            <div
              key={surah.id}
              className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 flex flex-col sm:flex-row items-center justify-between hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Right Section: Surah Info */}
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="flex-shrink-0 w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xl group-hover:bg-emerald-100 transition-colors duration-300">
                  {surah.id}
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-emerald-900 mb-1">
                    سورة {surah.name}
                  </h2>
                  <div className="flex items-center gap-3 text-emerald-600 text-sm">
                    <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      {surah.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>{surah.verses}</span>
                      <span>آيات</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Left Section: Action Buttons */}
              <div className="flex items-center gap-4 mt-6 sm:mt-0 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors duration-300 font-medium">
                  <Play size={18} fill="currentColor" />
                  <span>استمع</span>
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-emerald-700 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors duration-300 font-medium">
                  <BookOpen size={18} />
                  <span>اقرأ</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuranList;
