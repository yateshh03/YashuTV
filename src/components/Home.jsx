import SideNav from "./partials/SideNav";
import TopNav from "./partials/TopNav";
import Header from "./partials/Header";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./partials/Loading";

const Home = () => {
  document.title = "Yashu TV | HomePage";

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <TopNav />
        <Header data={wallpaper} />

        <div className=" flex justify-between p-5 ">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>

          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
