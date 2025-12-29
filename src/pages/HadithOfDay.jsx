import { useEffect } from "react";
import {
  BookOpen,
  User,
  Info,
  ScrollText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getDailyHadithAsync } from "../redux/slices/hadthSlice";
import Loader from "../ui/Loader";

const HadithOfDay = () => {
  const dispatch = useDispatch();
  const { dailyHadith, loading } = useSelector((state) => state.hadith);

  useEffect(() => {
    dispatch(getDailyHadithAsync());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (!dailyHadith) return null;

  const translateGrade = (grade) => {
    if (!grade) return "";
    const gradeText = grade.toLowerCase();

    if (gradeText.includes("sahih")) return "صحيح";
    if (gradeText.includes("hasan")) return "حسن";
    if (gradeText.includes("daif")) return "ضعيف";
    if (gradeText.includes("maudu")) return "موضوع";

    return grade;
  };

  const getGradeStyles = (grade) => {
    const gradeText = grade?.toLowerCase() || "";

    if (gradeText.includes("صحيح") || gradeText.includes("sahih")) {
      return {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: <CheckCircle2 size={18} />,
      };
    } else if (gradeText.includes("حسن") || gradeText.includes("hasan")) {
      return {
        bg: "bg-amber-100",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: <HelpCircle size={18} />,
      };
    } else {
      return {
        bg: "bg-rose-100",
        text: "text-rose-700",
        border: "border-rose-200",
        icon: <AlertCircle size={18} />,
      };
    }
  };

  const gradeStyle = getGradeStyles(dailyHadith.status || dailyHadith.grade);
  const arabicGrade = translateGrade(dailyHadith.status || dailyHadith.grade);

  return (
    <div
      className="min-h-screen bg-[#fcfdfb] py-12 px-4 sm:px-6 lg:px-8 font-amiri"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-emerald-900 mb-4 font-quran tracking-tight">
            حديث اليوم
          </h1>
          <p className="text-emerald-800/60 text-lg">
            قطوف من سنة النبي صلى الله عليه وسلم
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-emerald-600 to-transparent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Hadith Statement Section */}
        <div className="relative mb-12 group">
          <div className="absolute -inset-4 bg-emerald-600/5 rounded-[3rem] blur-2xl group-hover:bg-emerald-600/10 transition-all duration-500"></div>
          <div className="relative bg-white border border-emerald-100/50 p-10 md:p-14 rounded-4xl shadow-[0_20px_50px_rgba(6,95,70,0.05)] text-center">
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-emerald-700 rounded-2xl rotate-45 flex items-center justify-center text-white shadow-lg">
              <ScrollText size={32} className="-rotate-45" />
            </div>

            <p className="text-3xl md:text-4xl leading-relaxed text-emerald-950 font-quran font-bold mb-8">
              {dailyHadith.hadithArabic || dailyHadith.text}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {dailyHadith.hadithNarrator && (
                <div className="flex items-center gap-2 px-5 py-2 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-100/50 text-sm font-bold">
                  <User size={16} />
                  <span>
                    الراوي: {dailyHadith.hadithNarrator || dailyHadith.narrator}
                  </span>
                </div>
              )}
              {(dailyHadith.status || dailyHadith.grade) && (
                <div
                  className={`flex items-center gap-2 px-5 py-2 ${gradeStyle.bg} ${gradeStyle.text} rounded-full border ${gradeStyle.border} text-sm font-bold`}
                >
                  {gradeStyle.icon}
                  <span>درجة الحديث: {arabicGrade}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        {(dailyHadith.explanation ||
          dailyHadith.story ||
          dailyHadith.englishExplanation) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Explanation */}
            {(dailyHadith.explanation || dailyHadith.englishExplanation) && (
              <div className="bg-white border border-emerald-100/50 p-8 rounded-4xl shadow-[0_10px_30px_rgba(6,95,70,0.03)] hover:shadow-[0_15px_40px_rgba(6,95,70,0.06)] transition-all">
                <div className="flex items-center gap-3 mb-6 text-emerald-700">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <BookOpen size={20} />
                  </div>
                  <h3 className="text-2xl font-bold font-quran">
                    تفسير الحديث
                  </h3>
                </div>
                <p className="text-emerald-900/80 leading-loose text-lg font-medium">
                  {dailyHadith.explanation || dailyHadith.englishExplanation}
                </p>
              </div>
            )}

            {/* Story/Context */}
            {dailyHadith.story && (
              <div className="bg-white border border-emerald-100/50 p-8 rounded-4xl shadow-[0_10px_30px_rgba(6,95,70,0.03)] hover:shadow-[0_15px_40px_rgba(6,95,70,0.06)] transition-all">
                <div className="flex items-center gap-3 mb-6 text-emerald-700">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Info size={20} />
                  </div>
                  <h3 className="text-2xl font-bold font-quran">قصة الحديث</h3>
                </div>
                <p className="text-emerald-900/80 leading-loose text-lg font-medium">
                  {dailyHadith.story}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Source Footer */}
        {(dailyHadith.source || dailyHadith.bookSlug) && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-3 bg-white border border-emerald-100 rounded-2xl text-emerald-800/60 shadow-sm text-sm font-bold">
              <BookOpen size={16} />
              <span>
                المصدر:{" "}
                {dailyHadith.source ||
                  (dailyHadith.bookSlug === "sahih-bukhari"
                    ? "صحيح البخاري"
                    : dailyHadith.bookSlug === "sahih-muslim"
                    ? "صحيح مسلم"
                    : dailyHadith.bookSlug === "sunan-abu-dawood"
                    ? "سنن أبي داود"
                    : dailyHadith.bookSlug === "jami-at-tirmidhi"
                    ? "جامع الترمذي"
                    : dailyHadith.bookSlug === "sunan-an-nasai"
                    ? "سنن النسائي"
                    : dailyHadith.bookSlug === "sunan-ibn-majah"
                    ? "سنن ابن ماجه"
                    : dailyHadith.bookSlug === "muwatta-malik"
                    ? "موطأ مالك"
                    : dailyHadith.bookSlug === "musnad-ahmad"
                    ? "مسند أحمد"
                    : dailyHadith.bookSlug)}
              </span>
            </div>
          </div>
        )}

        {/* Decorative elements */}
        <div className="fixed top-0 left-0 p-8 opacity-[0.02] pointer-events-none hidden lg:block">
          <div className="w-80 h-80 border-40 border-emerald-900 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default HadithOfDay;
