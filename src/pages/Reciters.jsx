import React from "react";
import { Play, List } from "lucide-react";

const reciters = [
  { id: 1, name: "مشاري بن راشد العفاسي" },
  { id: 2, name: "عبد الباسط عبد الصمد" },
  { id: 3, name: "سعود الشريم" },
  { id: 4, name: "ماهر المعيقلي" },
];

const Reciters = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4 font-arabic">
            قراء القرآن الكريم
          </h1>
          <p className="text-emerald-700 text-lg">
            استمع إلى تلاوات عطرة من كبار القراء
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reciters.map((reciter) => (
            <div
              key={reciter.id}
              className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8 flex items-center justify-around hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center gap-6">
                <div className="shrink-0 w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 font-bold text-2xl group-hover:bg-emerald-100 transition-colors duration-300">
                  {reciter.id}
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-emerald-900 mb-1 font-arabic">
                    الشيخ {reciter.name}
                  </h2>
                  <span className="text-emerald-600 text-sm">
                    رواية حفص عن عاصم
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 text-white rounded-xl hover:bg-emerald-800 transition-colors duration-300 font-medium shadow-sm">
                  <Play size={20} fill="currentColor" />
                  <span>استمع</span>
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-emerald-100 text-emerald-700 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-300 font-medium">
                  <List size={20} />
                  <span>عرض السور</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reciters;
