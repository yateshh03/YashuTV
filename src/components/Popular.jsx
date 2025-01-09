import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./partials/Loading";
import TopNav from "./partials/TopNav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

const Popular = () => {
  document.title = "Yashu TV | Popular";

  const navigate = useNavigate();

  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }

      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = async () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setpopular([]);
      setpage(1);
      GetPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen h-screen relative">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556cd] ri-arrow-left-line"
          ></i>{" "}
          Popular
        </h1>

        <div className="flex items-center w-[80%]">
          <TopNav />
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        loader={<h1>Loading...</h1>}
        hasMore={hasMore}
        next={GetPopular}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
