import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import noimage from "../../../src/noimage.jpg";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-[100%] flex overflow-y-hidden justify-between gap-5 mb-5 p-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="w-[15%] h-[35vh] md:min-w-[30%] lg:min-w-[20%] sm:min-w-[10%] max-h-[90%] bg-zinc-900 flex flex-col rounded-lg overflow-hidden shadow-lg"
          >
            {/* Image Section */}
            <img
              className="w-full h-[55%] object-cover"
              src={
                d.backdrop_path || d.profile_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.profile_path || d.poster_path
                    }`
                  : noimage
              }
              alt=""
            />

            {/* Content Section */}
            <div className="text-white p-4 flex flex-col gap-5 h-[45%] overflow-y-auto">
              <h1 className="text-lg lg:text-xl font-semibold">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="text-sm text-zinc-400">
                {d.overview.slice(0, 50)}...
                <span className="text-zinc-500 cursor-pointer"> more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
