import { useState } from "react";
import {
  Compass,
  MapPin,
  RefreshCw,
  Smartphone,
  Navigation,
} from "lucide-react";

const Qibla = () => {
  const [location] = useState({
    city: "القاهرة",
    country: "مصر",
    coords: "31.2357° N, 30.0444° E",
  });
  const [qiblaAngle] = useState(135); // Mock angle for Cairo to Mecca
  const [isLocating, setIsLocating] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleLocate = () => {
    setIsLocating(true);
    // Mocking a location fetch delay
    setTimeout(() => {
      setIsLocating(false);
      // In a real app, we'd use navigator.geolocation
    }, 1500);
  };

  const handleRecalculate = () => {
    // Subtle animation effect
    setRotation((prev) => prev + 360);
  };

  return (
    <div
      className="min-h-screen bg-[#fcfdfb] py-12 px-4 sm:px-6 lg:px-8 font-amiri"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 shadow-sm border border-emerald-50">
              <Compass size={32} />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-emerald-900 mb-4 font-quran tracking-tight">
            إتجاه القبلة
          </h1>
          <p className="text-emerald-800/60 text-lg">
            حدد إتجاه القبلة بدقة من موقعك الحالي
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-emerald-600 to-transparent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Compass Section */}
        <div className="relative mb-12 flex justify-center">
          <div className="absolute -inset-10 bg-emerald-600/5 rounded-full blur-3xl opacity-50"></div>

          <div className="relative w-72 h-72 md:w-96 md:h-96 bg-white rounded-full border-8 border-emerald-50 shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Compass Dial */}
            <div className="absolute inset-4 rounded-full border border-emerald-100/50 flex items-center justify-center">
              <div className="text-emerald-900/10 font-bold text-lg">N</div>
              <div className="absolute top-0 w-1 h-4 bg-emerald-200 rounded-full"></div>
              <div className="absolute bottom-0 w-1 h-4 bg-emerald-100 rounded-full"></div>
              <div className="absolute left-0 h-1 w-4 bg-emerald-100 rounded-full"></div>
              <div className="absolute right-0 h-1 w-4 bg-emerald-100 rounded-full"></div>
            </div>

            {/* Compass Needle Container */}
            <div
              className="relative w-full h-full transition-transform duration-1000 ease-out flex items-center justify-center"
              style={{ transform: `rotate(${qiblaAngle + rotation}deg)` }}
            >
              {/* Arrow */}
              <div className="relative flex flex-col items-center">
                <div className="w-4 h-32 md:w-6 md:h-44 bg-emerald-700 rounded-full shadow-lg relative z-20">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-20 border-l-transparent border-r-transparent border-b-emerald-700"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full border-4 border-emerald-700 shadow-inner z-30 flex items-center justify-center">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-700 rounded-full"></div>
                </div>
              </div>

              {/* Kaaba Marker */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <div className="text-xs font-bold text-emerald-700 font-quran bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm whitespace-nowrap">
                  القبلة
                </div>
                <Navigation
                  size={16}
                  className="text-emerald-700 fill-emerald-700"
                />
              </div>
            </div>

            {/* Background Kaaba Icon watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <Smartphone size={200} />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-100 shadow-sm font-bold text-lg animate-pulse">
            <Smartphone size={20} />
            <span>وجّه هاتفك نحو اتجاه القبلة</span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Location Card */}
          <div className="bg-white border border-emerald-100/50 p-8 rounded-4xl shadow-[0_10px_30px_rgba(6,95,70,0.03)] flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <MapPin size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-950 mb-1">
                الموقع الحالي
              </h3>
              <p className="text-emerald-800/60 font-medium">
                {location.city}، {location.country}
              </p>
              <p className="text-emerald-800/20 text-xs font-mono mt-1">
                {location.coords}
              </p>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white border border-emerald-100/50 p-8 rounded-4xl shadow-[0_10px_30px_rgba(6,95,70,0.03)] flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-xl">
              {qiblaAngle}°
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-950 mb-1">
                زاوية القبلة
              </h3>
              <p className="text-emerald-800/60 font-medium">
                الزاوية المحسوبة من الشمال
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleLocate}
            disabled={isLocating}
            className="flex items-center gap-2 px-8 py-3.5 bg-emerald-700 text-white rounded-full font-bold shadow-lg hover:bg-emerald-800 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLocating ? (
              <RefreshCw size={20} className="animate-spin" />
            ) : (
              <MapPin size={20} />
            )}
            <span>{isLocating ? "جاري التحديد..." : "تحديد الموقع"}</span>
          </button>

          <button
            onClick={handleRecalculate}
            className="flex items-center gap-2 px-8 py-3.5 bg-white border border-emerald-100 text-emerald-700 rounded-full font-bold shadow-sm hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95"
          >
            <RefreshCw size={20} />
            <span>إعادة الحساب</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Qibla;
