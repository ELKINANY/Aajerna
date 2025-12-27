import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAzkarAsync } from "../redux/slices/azkarSlice";
import { useEffect } from "react";
import Loader from "../ui/Loader";

const AzkarList = () => {
  const dispatch = useDispatch();
  let { azkar, loading } = useSelector((state) => state.azkar);

  useEffect(() => {
    dispatch(fetchAzkarAsync());
  }, [dispatch]);

  // Get unique categories
  const categories = [...new Set(azkar.map((item) => item.category))];
  // Filter categories with number of azkar > 5
  const filteredCategories = categories.filter((category) => {
    const categoryAzkar = azkar.filter(
      (azkar) => azkar.category === category
    );
    return categoryAzkar.length > 5;
  });

  if (loading && azkar.length === 0) {
    return <Loader />
  }

  return (
    <div
      className="min-h-screen bg-[#fcfdfb] py-12 px-4 sm:px-6 lg:px-8 font-amiri"
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-emerald-900 mb-4 font-quran">
            الأذكار
          </h1>
          <p className="text-emerald-800/60 text-lg">
            مجموعة من الأذكار اليومية والأدعية المأثورة
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-emerald-600 to-transparent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category) => (
            <Link
              key={category}
              to={`/azkar/${encodeURIComponent(category)}`}
              className="group relative bg-white border border-emerald-100/50 p-8 rounded-3xl shadow-[0_10px_30px_rgba(6,95,70,0.03)] hover:shadow-[0_20px_40px_rgba(6,95,70,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-center justify-between relative z-10">
                <div className="flex flex-col gap-1">
                  <h3 className="text-3xl font-bold text-emerald-900 font-quran group-hover:text-emerald-700 transition-colors">
                    {category}
                  </h3>
                  <span className="text-emerald-800/40 text-sm font-sans font-medium">
                    {
                      azkar.filter((a) => a.category === category)
                        .length
                    }{" "}
                    ذكراً
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <ChevronLeft size={24} />
                </div>
              </div>

              {/* Decorative background circle */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-emerald-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
            </Link>
          ))}
        </div>

        {/* Decorative corner */}
        <div className="fixed bottom-0 right-0 p-8 opacity-[0.03] pointer-events-none hidden lg:block">
          <div className="w-64 h-64 border-40 border-emerald-900 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default AzkarList;
