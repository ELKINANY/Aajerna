import image from "../../../assets/images/صلاة-المسلمين.jpg";

const prayer_times = [
  { name: "الفجر", value: "05:45" },
  { name: "الظهر", value: "12:45" },
  { name: "العصر", value: "15:45" },
  { name: "المغرب", value: "18:45" },
  { name: "العشاء", value: "20:45" },
];

function Prayer_Times() {
  return (
    <div dir="ltr" className="relative h-150 w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-linear-to-l from-emerald-900 via-emerald-900/70 to-transparent" />
      <div className="relative z-10 grid h-full grid-cols-2 gap-4 items-center px-6 md:flex md:justify-around md:gap-2 md:px-10">
        {prayer_times.map((item) => {
          return (
            <div
              key={item.name}
              className="flex flex-col items-center gap-4 rounded-md px-6 py-5 text-white bg-emerald-950 hover:scale-105 transition-all cursor-pointer"
            >
              <p>{item.name}</p>
              <p>{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Prayer_Times;
