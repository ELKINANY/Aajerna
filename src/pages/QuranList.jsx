import { Play, BookOpen, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSurahsAsync } from "../redux/slices/quranSlice";

const QuranList = () => {
  const dispatch = useDispatch();
  const { surahs, loading } = useSelector((state) => state.quran);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getAllSurahsAsync());
  }, [dispatch]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = surahs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(surahs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading && surahs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">
            القرآن الكريم
          </h1>
          <p className="text-emerald-700 text-lg">قائمة السور الكريمة</p>
        </div>

        <div className="grid gap-6">
          {currentItems.map((surah, index) => {
            const surahNumber = indexOfFirstItem + index + 1;
            return (
            <div
              key={surahNumber}
              className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 flex flex-col sm:flex-row items-center justify-between hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="shrink-0 w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xl group-hover:bg-emerald-100 transition-colors duration-300">
                  {surahNumber}
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-emerald-900 mb-1">
                    سورة {surah.surahNameArabic}
                  </h2>
                  <div className="flex items-center gap-3 text-emerald-600 text-sm">
                    <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      {surah.revelationPlace === "Meccan" ? "مكية" : "مدنية"}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>{surah.totalAyah}</span>
                      <span>{surah.totalAyah > 10 ? "آية" : "آيات"}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6 sm:mt-0 w-full sm:w-auto">
                <Link
                  to={`/reciters/${surahNumber}`}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors duration-300 font-medium"
                >
                  <Play size={18} fill="currentColor" />
                  <span>استمع</span>
                </Link>
                <Link
                  to={`/quran/${surahNumber}`}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-emerald-700 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors duration-300 font-medium"
                >
                  <BookOpen size={18} />
                  <span>اقرأ</span>
                </Link>
              </div>
            </div>
          )}
          )}
        </div>

        {/* Pagination UI */}
        {surahs.length > itemsPerPage && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                currentPage === totalPages
                  ? "text-gray-300 border-gray-100 cursor-not-allowed"
                  : "text-emerald-700 border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                // Only show a limited range of page numbers
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`w-10 h-10 rounded-lg border transition-all duration-300 font-medium ${
                        currentPage === pageNum
                          ? "bg-emerald-700 text-white border-emerald-700"
                          : "text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <span key={pageNum} className="text-emerald-300">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                currentPage === 1
                  ? "text-gray-300 border-gray-100 cursor-not-allowed"
                  : "text-emerald-700 border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuranList;
