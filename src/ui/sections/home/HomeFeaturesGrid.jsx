import { Link } from "react-router-dom";
import { Book, Scroll, Heart, Compass, Mic2, Clock } from "lucide-react";

const features = [
  {
    name: "القرآن الكريم",
    desc: "تلاوات عطرة وسور مباركة",
    icon: <Book size={32} />,
    href: "/quran",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "حديث اليوم",
    desc: "قطوف من سنة نبينا محمد",
    icon: <Scroll size={32} />,
    href: "/hadith",
    color: "bg-amber-50 text-amber-600",
  },
  {
    name: "مواقيت الصلاة",
    desc: "مواعيد الصلاة بدقة حسب موقعك",
    icon: <Clock size={32} />,
    href: "/prayer-times",
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "الأذكار",
    desc: "أذكار الصباح والمساء وكل اليوم",
    icon: <Heart size={32} />,
    href: "/azkar",
    color: "bg-rose-50 text-rose-600",
  },
  {
    name: "إتجاه القبلة",
    desc: "بوصلة دقيقة لتحديد القبلة",
    icon: <Compass size={32} />,
    href: "/qibla",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    name: "المقرئون",
    desc: "أجمل الأصوات من كبار القراء",
    icon: <Mic2 size={32} />,
    href: "/reciters",
    color: "bg-teal-50 text-teal-600",
  },
];

const HomeFeaturesGrid = () => {
  return (
    <section
      className="py-20 px-6 md:px-16 lg:px-24 bg-white font-amiri"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-4 font-quran">
            استكشف خدماتنا
          </h2>
          <p className="text-emerald-800/60 text-lg max-w-2xl">
            نقدم لك مجموعة متكاملة من الخدمات التي تعينك على ذكر الله في يومك
            وليلتك.
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-emerald-600 to-transparent mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={feature.name}
              to={feature.href}
              className="group relative bg-white border border-emerald-100 p-8 rounded-4xl shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Feature Icon */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${feature.color}`}
              >
                {feature.icon}
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-emerald-950 mb-2 group-hover:text-emerald-700 transition-colors">
                  {feature.name}
                </h3>
                <p className="text-emerald-800/60 text-lg leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Arrow Indicator */}
              <div className="mt-6 flex items-center gap-2 text-emerald-600 font-bold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                <span className="text-sm">اكتشف المزيد</span>
                <span className="text-xl">←</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturesGrid;
