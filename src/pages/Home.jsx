import Prayer_Times from "../ui/sections/home/PrayerTimes"
import Today_Ayah from "../ui/sections/home/TodayAyah"
import Today_Zekr from "../ui/sections/home/TodayZekr"

function Home() {
  return (
    <>
      <Today_Ayah />
      <Prayer_Times />
      <Today_Zekr />
    </>
  )
}

export default Home
