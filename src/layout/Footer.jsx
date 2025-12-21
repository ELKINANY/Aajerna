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
    <div className="bg-emerald-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center h-16 w-16 gap-2">
              <img src={logo} alt="App Logo" />
              <span className="text-white text-2xl font-bold">آجرنا</span>
            </div>
          </Link>
          <div className="grid grid-cols-1 items-center gap-2">
            <span className="text-white text-xl font-bold mb-4">
              روابط سريعة
            </span>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white text-xl "
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-start gap-5 w-1/3">
            <span className="text-white text-lg">
              آجرنا هو موقع إسلامي شامل يهدف إلى مساعدة المسلمين على التقرب إلى
              الله من خلال توفير القرآن الكريم كاملًا، والأحاديث النبوية
              الصحيحة، ومواقيت الصلاة بدقة حسب الموقع. يقدم الموقع تجربة بسيطة
              وسهلة الاستخدام تناسب جميع الأعمار، مع تصميم هادئ يراعي روحانية
              المحتوى. نسعى لأن يكون الموقع رفيقًا يوميًا للمسلم في عبادته
              وذكره.
            </span>
            <span className="text-white text-lg ">
              آجرنا © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
