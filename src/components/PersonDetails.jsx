import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import {
  asyncloadperson,
  removeperson,
} from "./../store/actions/personActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "./partials/Loading";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  console.log(info);

  useEffect(() => {
    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="px-[10%] w-screen h-[150vh] bg-[#1F1E24]">
      {/* Part 1 Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center -ml-[5%] gap-10 text-xl sm:text-lg px-[10%] md:px-[5%] sm:px-4">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex ">
        {/* Part 2 left poster and details  */}
        <div className="w-[20%] mt-7 ">
          <img
            className="shadow-[8px_17px_32px_2px_rgba(0,0,0,.5)] bg-red-100 h-[35vh] sm:h-[40vh] md:h-[44vh] w-[20vh] sm:w-[30vh] md:w-[33vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.backdrop_path || info.detail.profile_path
            }`}
            alt=""
          />

          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
          {/* Social Media Links  */}
          <div className="">
            <div className="flex items-center justify-between text-2xl text-white gap-10 w-[135px] sm:gap-2">
              <a
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              >
                <i className="ri-earth-fill"></i>
              </a>

              <a
                target="_blank"
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              >
                <i className="ri-facebook-circle-fill"></i>
              </a>

              <a
                target="_blank"
                href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              >
                <i className="ri-instagram-fill"></i>
              </a>

              <a
                target="_blank"
                href={`https://www.twitter.com/${info.externalid.twitter_id}`}
              >
                <i className="ri-twitter-x-fill"></i>
              </a>
            </div>
          </div>

          {/* Personal Information  */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Info
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold">Known for</h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.known_for_department}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className=" text-zinc-400 ">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Deathday</h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place Of Birth
          </h1>
          <h1 className=" text-zinc-400 ">{info.detail.place_of_birth}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Also Known As
          </h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>

        {/* Part 3 right Details and Information */}
        <div className="w-[80%] ml-[5%] mt-7">
          <h1 className="text-6xl text-zinc-400 font-black my-5">
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold">Biography</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>

          <h1 className="mt-5 text-lg text-zinc-400 font-semibold">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>

            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>

          <div className="text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255, 255, 255, .3)] border-2 border-zinc-700 p-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`} className="">
                  <span className="">
                    {" "}
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-5 mt-2">
                    {c.character && `Character Name:  ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
