import { Play, List, X, Pause, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import { getAudio } from "../service/quranAPI";

const Reciters = () => {
  const {surahId} = useParams();
  const { reciters, surah, loading } = useSelector((state) => state.quran);
  const [selectedReciter, setSelectedReciter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [recitersPerPage] = useState(10);

  const indexOfLastReciter = currentPage * recitersPerPage;
  const indexOfFirstReciter = indexOfLastReciter - recitersPerPage;
  const currentReciters = reciters.slice(indexOfFirstReciter, indexOfLastReciter);
  const totalPages = Math.ceil(reciters.length / recitersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePlayClick = (reciter) => {
  if (!surahId) return;

  const url = getAudio(surahId, reciter.id - 1);
  setSelectedReciter(reciter);
  setAudioUrl(url);
  setIsPlaying(true);
};

useEffect(() => {
  if (audioRef.current && audioUrl) {
    audioRef.current.load();
    audioRef.current
      .play()
      .catch((err) => console.log("Play error:", err));
  }
}, [audioUrl]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  if (loading && reciters.length === 0) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4 font-arabic">
            قراء القرآن الكريم
          </h1>
          <p className="text-emerald-700 text-lg">
            {surahId && surah.surahNameArabic
              ? `استمع لسورة ${surah.surahNameArabic}`
              : "استمع إلى تلاوات عطرة من كبار القراء"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentReciters.map((reciter) => (
            <div
              key={reciter.id}
              className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8 flex items-center justify-between hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center gap-6">
                <div className="shrink-0 w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 font-bold text-2xl group-hover:bg-emerald-100 transition-colors duration-300">
                  {reciter.id}
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-emerald-900 mb-1 font-arabic">
                    الشيخ {reciter.name}
                  </h2>
                  
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                {
                  surahId ? (
                    <button
                      onClick={() => handlePlayClick(reciter)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 text-white rounded-xl hover:bg-emerald-800 transition-colors duration-300 font-medium shadow-sm"
                    >
                      <Play size={20} fill="currentColor" />
                      <span>استمع</span>
                    </button>
                  ) : (
                    <Link to={`/quran`} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-emerald-100 text-emerald-700 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-300 font-medium">
                      <List size={20} />
                      <span>عرض السور</span>
                    </Link>
                  )
                }
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination UI */}
        {reciters.length > recitersPerPage && (
          <div className="mt-12 flex items-center justify-center gap-1">
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

        {/* Audio Player */}
        {audioUrl && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-100 shadow-lg p-4 z-50">
            <div
              className="max-w-5xl mx-auto flex items-center justify-between"
              dir="rtl"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlayPause}
                  className="w-12 h-12 bg-emerald-700 text-white rounded-full flex items-center justify-center hover:bg-emerald-800 transition-colors"
                >
                  {isPlaying ? (
                    <Pause size={20} />
                  ) : (
                    <Play size={20} fill="currentColor" />
                  )}
                </button>
                <div>
                  <p className="font-bold text-emerald-900">
                    {selectedReciter?.name}
                  </p>
                  <p className="text-sm text-emerald-600">
                    {surah.surahNameArabic || `سورة رقم ${surahId}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setAudioUrl(null);
                  setIsPlaying(false);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.src = "";
                  }
                }}
                className="text-emerald-700 hover:text-emerald-900"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}
        <audio ref={audioRef} src={audioUrl} onEnded={handleAudioEnded} />
      </div>
    </div>
  );
};

export default Reciters;
