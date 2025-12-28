import { useEffect, useState } from "react";
import { getUserLocation } from "../utils/getUserLocation";
import { getQiblaDirection } from "../service/qiblaAPI";
import {
  Compass,
  MapPin,
  RefreshCw,
  Smartphone,
  Navigation,
} from "lucide-react";

const Qibla = () => {
  const [qiblaAngle, setQiblaAngle] = useState(null);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState(null);

  /* ===============================
    🧭 Device Orientation (Android)
    =============================== */
  useEffect(() => {
    const handleOrientation = (event) => {
      if (event.alpha !== null) {
        // Android returns alpha as CCW from 0-360.
        // We convert it to CW (Heading) for the calculation.
        const heading = (360 - event.alpha) % 360;
        setDeviceHeading(heading);
      }
    };

    window.addEventListener(
      "deviceorientationabsolute",
      handleOrientation,
      true
    );

    return () => {
      window.removeEventListener(
        "deviceorientationabsolute",
        handleOrientation,
        true
      );
    };
  }, []);

  /* ===============================
     📍 Location + Qibla API
     =============================== */
  const handleLocate = async () => {
    setIsLocating(true);

    try {
      const { lat, lng } = await getUserLocation();
      const direction = await getQiblaDirection(lat, lng);

      setQiblaAngle(direction);

      setLocation({
        city: "موقعك الحالي",
        country: "",
        coords: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
      });
    } catch (err) {
      alert(err);
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfb] py-12 px-4 font-amiri" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
              <Compass size={32} />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-emerald-900 mb-3">
            إتجاه القبلة
          </h1>
          <p className="text-emerald-800/60">لف هاتفك ليظهر اتجاه القبلة</p>
        </div>

        {/* Compass */}
        <div className="flex justify-center mb-12">
          <div className="relative w-80 h-80 bg-white rounded-full border-8 border-emerald-50 shadow-2xl flex items-center justify-center">
            {/* Label - Fixed at top */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
              <span className="text-xs font-bold text-emerald-700">القبلة</span>
              <Navigation size={16} className="text-emerald-700" />
            </div>

            {/* Rotating Arrow */}
            <div
              className="absolute w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
              style={{
                transform:
                  qiblaAngle !== null
                    ? `rotate(${qiblaAngle - deviceHeading}deg)`
                    : "rotate(0deg)",
              }}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-5 h-40 bg-emerald-700 rounded-full">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-emerald-700"></div>
                </div>
                <div className="absolute top-1/2 w-10 h-10 bg-white border-4 border-emerald-700 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-emerald-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow flex gap-4">
            <MapPin className="text-emerald-700" />
            <div>
              <h3 className="font-bold mb-1">الموقع الحالي</h3>
              {location ? (
                <>
                  <p>{location.city}</p>
                  <p className="text-xs opacity-50">{location.coords}</p>
                </>
              ) : (
                <p className="opacity-50">لم يتم تحديد الموقع بعد</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow flex gap-4">
            <div className="text-xl font-bold text-emerald-700">
              {qiblaAngle !== null ? `${qiblaAngle.toFixed(1)}°` : "--"}
            </div>
            <div>
              <h3 className="font-bold mb-1">زاوية القبلة</h3>
              <p className="opacity-50">من الشمال</p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={handleLocate}
            disabled={isLocating}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-700 text-white rounded-full font-bold disabled:opacity-50"
          >
            {isLocating ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <Smartphone size={18} />
            )}
            {isLocating ? "جاري التحديد..." : "تحديد الموقع"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Qibla;
