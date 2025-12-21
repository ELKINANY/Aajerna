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
    <div dir="ltr" className="relative h-100 w-full overflow-hidden ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-linear-to-l from-emerald-900 via-emerald-900/70 to-transparent" />
      <div className="relative z-10 flex h-full justify-around gap-2 items-center px-10">
        {prayer_times.map((item) => {
          return (
            <div
              key={item.name}
              className="flex flex-col justify-center items-center gap-4 rounded-md p-2 text-white bg-emerald-950 w-2/18 h-40 hover:scale-105 transition-all cursor-pointer"
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
