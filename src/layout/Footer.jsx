import { Link } from "react-router-dom";
import logo from "../assets/Logos/App_Logo.png";

const navigation = [
  { name: "القرآن الكريم", href: "/quran" },
  { name: "الأحاديث", href: "/hadith" },
  { name: "مواقيت الصلاة", href: "/prayer-times" },
  { name: "القبلة", href: "/qibla" },
  { name: "الأذكار", href: "/azkar" },
];

function Footer() {
  return (
    <div className="bg-emerald-900 py-20" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <img src={logo} alt="App Logo" className="h-12 w-12" />
              <span className="text-white text-2xl font-bold">آجرنا</span>
            </div>
          </Link>

          {/* Links */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-white text-xl font-bold mb-4">
              روابط سريعة
            </span>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white text-lg hover:underline"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* About */}
          <div className="flex flex-col items-center gap-5 md:items-start md:w-1/3 text-center md:text-right">
            <span className="text-white text-lg leading-relaxed">
              آجرنا هو موقع إسلامي شامل يهدف إلى مساعدة المسلمين على التقرب إلى
              الله من خلال توفير القرآن الكريم كاملًا، والأحاديث النبوية
              الصحيحة، ومواقيت الصلاة بدقة حسب الموقع. يقدم الموقع تجربة بسيطة
              وسهلة الاستخدام تناسب جميع الأعمار، مع تصميم هادئ يراعي روحانية
              المحتوى.
            </span>
            <span className="text-white text-lg">
              آجرنا © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
