import image from "../../../assets/images/Zekr image.jpg";

function Today_Zekr() {
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
            {/* ذكر اليوم */}
            {"{ ذكر اليوم }"}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Today_Zekr;
