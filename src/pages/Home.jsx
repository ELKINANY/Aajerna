import HomeHero from "../ui/sections/home/HomeHero";
import HomeFeaturesGrid from "../ui/sections/home/HomeFeaturesGrid";
import HomeDailyHighlights from "../ui/sections/home/HomeDailyHighlights";

function Home() {
  return (
    <div className="bg-[#fcfdfb]">
      <HomeHero />
      <HomeDailyHighlights />
      <HomeFeaturesGrid />
    </div>
  );
}

export default Home;
