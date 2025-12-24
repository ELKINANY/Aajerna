import { useParams, Link } from "react-router-dom";
import azkarData from "../assets/azkar.json";
import { ArrowRight, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";

const AzkarDetails = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);
  const items = azkarData.filter((item) => item.category === decodedCategory);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="min-h-screen bg-[#fcfdfb] py-8 px-4 sm:px-6 lg:px-8 font-amiri"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link
            to="/azkar"
            className="group flex items-center gap-2 text-emerald-800/70 hover:text-emerald-800 transition-all"
          >
            <div className="w-8 h-8 rounded-full border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
              <ArrowRight size={18} />
            </div>
            <span className="font-medium">رجوع للأصناف</span>
          </Link>

          <div className="bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
            <span className="text-emerald-800 font-bold font-quran">
              {decodedCategory}
            </span>
          </div>
        </div>

        {/* Azkar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative bg-white border border-emerald-100/50 p-8 rounded-4xl shadow-[0_10px_40px_rgba(6,95,70,0.03)] flex flex-col justify-between"
            >
              <div className="mb-8">
                <p className="text-2xl leading-relaxed text-emerald-950 text-center font-quran">
                  {item.text}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(item.text, item.id)}
                    className="p-2.5 rounded-xl border border-emerald-50 text-emerald-600 hover:bg-emerald-50 transition-all"
                    title="نسخ"
                  >
                    {copiedId === item.id ? (
                      <Check size={18} />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                  <button className="p-2.5 rounded-xl border border-emerald-50 text-emerald-600 hover:bg-emerald-50 transition-all">
                    <Share2 size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-emerald-800/40 text-sm font-medium font-sans">
                    التكرار
                  </span>
                  <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold shadow-sm">
                    {item.count}
                  </div>
                </div>
              </div>

              {/* Decorative line */}
              <div className="absolute top-0 right-1/2 translate-x-1/2 w-16 h-1 bg-emerald-100/50 rounded-b-full"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-emerald-800/40 text-xl">
              لا توجد أذكار في هذا القسم حالياً
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AzkarDetails;
