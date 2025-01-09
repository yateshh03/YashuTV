import axios from "../../utils/axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import noimage from "../../../src/noimage.jpg";

const TopNav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const Getsearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    Getsearches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto items-center">
      <i className="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none  bg-transparent"
        type="text"
        placeholder="search anything"
      />

      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className=" text-zinc-400 text-3xl ri-close-fill"
        ></i>
      )}

      <div
        id="topnav"
        className="z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] left-[5%] overflow-auto rounded "
      >
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 p-10 bg w-[100%] flex justify-start items-center border-b-2 border-zinc-100"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
              src={
                s.backdrop_path || s.profile_path || s.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path || s.poster_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span>{s.original_title || s.original_name || s.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopNav;