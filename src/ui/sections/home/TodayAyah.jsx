import image from "../../../assets/images/Quran image.jpg";

function Today_Ayah() {
  return (
    <div dir="ltr" className="relative h-150 w-full overflow-hidden ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-emerald-900 via-emerald-900/70 to-transparent" />
      <div className="relative z-10 flex h-full items-center px-10">
        <div className="flex flex-col items-center gap-5 px-10">
          <h1 className="text-4xl text-center font-bold text-white">
            {/* آية اليوم */}
            {"{ آية اليوم }"}
          </h1>
          <p className="text-center text-white">{"{ قراءة الآية بالصوت }"}</p>
        </div>
      </div>
    </div>
  );
}

export default Today_Ayah;
