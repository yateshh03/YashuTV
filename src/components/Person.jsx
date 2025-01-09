import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./partials/Loading";
import TopNav from "./partials/TopNav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

const Person = () => {
  document.title = "Yashu TV | People ";

  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  // const [page, setpage] = useState(1);
  // const [hasMore, sethasMore] = useState(true);

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/popular`);

      if (data.results.length > 0) {
        setperson((prev) => [...prev, ...data.results]);
        // setpage(page + 1);
      } else {
        // sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = async () => {
    if (person.length === 0) {
      GetPerson();
    } else {
      setperson([]);
      // setpage(1);
      GetPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-screen h-screen relative">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556cd] ri-arrow-left-line"
          ></i>{" "}
          People{" "}
        </h1>

        <div className="flex items-center w-[80%]">
          <TopNav />

          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        loader={<h1>Loading...</h1>}
        // hasMore={hasMore}
        next={GetPerson}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Person;
