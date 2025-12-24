import { Link } from "react-router-dom";
import { BookOpen, Sparkles } from "lucide-react";
import heroImage from "../../../assets/images/Quran image.jpg";

const HomeHero = () => {
  return (
    <div className="relative h-125 w-full overflow-hidden font-amiri" dir="rtl">
      {/* Background Image with Parallax-like effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-l from-emerald-950/90 via-emerald-900/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 backdrop-blur-md rounded-full text-emerald-100 text-sm font-medium mb-6 border border-white/10">
            <Sparkles size={14} className="text-emerald-300" />
            <span>مرحباً بك في آجرنا</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-quran leading-tight tracking-tight">
            دليلك الروحاني <span className="text-emerald-400">اليومي</span>
          </h1>

          <p className="text-xl md:text-2xl text-emerald-50/80 mb-10 leading-relaxed font-medium">
            استمتع بتجربة إيمانية متكاملة مع تلاوات القرآن الكريم، الأذكار
            اليومية، ومواقيت الصلاة بدقة عالية.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/quran"
              className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-500 transition-all hover:scale-105 shadow-xl shadow-emerald-900/20 active:scale-95 group"
            >
              <BookOpen
                size={22}
                className="group-hover:rotate-12 transition-transform"
              />
              <span>ابدأ القراءة الآن</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Blur Element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-48 -mb-48"></div>
    </div>
  );
};

export default HomeHero;
