import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { asyncloadtv, removetv } from "./../store/actions/tvActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "./partials/Loading";
import HorizontalCards from "./partials/HorizontalCards";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  console.log(info);

  useEffect(() => {
    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[140vh] px-[10%] md:px-[5%] sm:px-4 overflow-y-auto"
    >
      {/* Part 1 Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center -ml-[5%] gap-10 text-xl sm:text-lg px-[10%] md:px-[5%] sm:px-4">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line"
        ></Link>

        <div className="flex items-center justify-between gap-10 w-[140px] sm:gap-2">
          <a target="_blank" href={info.detail.homepage}>
            <i className="ri-external-link-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="ri-earth-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          >
            IMDb
          </a>
        </div>
      </nav>

      {/* Part 2 Poster and Details */}
      <div className="w-full flex flex-col md:flex-row gap-5">
        <img
          className="shadow-[8px_17px_32px_2px_rgba(0,0,0,.5)] h-[400px] sm:h-[40vh] md:h-[44vh] w-[20vh] sm:w-[30vh] md:w-[33vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.backdrop_path || info.detail.profile_path
          }`}
          alt=""
        />

        <div className="content ml-0 md:ml-[5%] text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-xl sm:text-2xl font-bold text-zinc-200">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-3 mb-5 flex items-center gap-x-3 flex-wrap">
            <span className="rounded-full text-sm sm:text-lg md:text-xl font-semibold bg-yellow-600 text-white w-[5vh] sm:w-[6vh] h-[5vh] sm:h-[6vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>

            <h1 className="text-base sm:text-lg md:text-2xl font-semibold leading-6">
              User Score
            </h1>
            <h1 className="text-sm sm:text-base md:text-lg">
              {info.detail.first_air_date}
            </h1>
            <h1 className="text-sm sm:text-base md:text-lg">
              {info.detail.genres.map((g) => g.name).join(", ")}
            </h1>
            <h1 className="text-sm sm:text-base md:text-lg">
              {info.detail.runtime}min
            </h1>
          </div>

          <h1 className="text-base sm:text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-lg sm:text-2xl mb-3 mt-5">Overview</h1>
          <p className="text-sm sm:text-base">{info.detail.overview}</p>

          <h1 className="text-lg sm:text-2xl mb-3 mt-5">tv Translated</h1>
          <p className="w-[100%] mb-10 md:w-[80vh] text-sm sm:text-base">
            {info.translations.join(", ")}
          </p>

          <Link
            className="p-5 bg-[#6556CD] rounded-lg"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill mr-3"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 Available on Platforms */}
      <div className="w-[90%] md:w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-5 sm:gap-x-10 items-center text-white mt-4">
            <h1 className="text-sm sm:text-base md:text-lg">
              Available on Platforms
            </h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[4vh] sm:w-[5vh] h-[4vh] sm:h-[5vh] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-5 sm:gap-x-10 items-center text-white mt-4">
            <h1 className="text-sm sm:text-base md:text-lg">
              Available on Rent
            </h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[4vh] sm:w-[5vh] h-[4vh] sm:h-[5vh] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-5 sm:gap-x-10 items-center text-white mt-4">
            <h1 className="text-sm sm:text-base md:text-lg">
              Available to Buy
            </h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[4vh] sm:w-[5vh] h-[4vh] sm:h-[5vh] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 Seasons */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="mt-10 text-3xl font-bold text-white pl-5">Seasons</h1>
      <div className="w-[100%] flex overflow-y-hidden justify-between gap-5 mb-5 p-5">
        {info.detail.seasons.length > 0 ? (
          info.detail.seasons.map((s, i) => (
            <div className="w-[15vw] md:min-w-[30vw] lg:min-w-[15vw] sm:min-w-[10vw] max-h-[90%] flex flex-col rounded-lg overflow-hidden shadow-lg">
              <img
                className="shadow-[8px_17px_32px_2px_rgba(0,0,0,.5)] min-w-[14vw] h-[40vh] object-cover"
                src={`https://image.tmdb.org/t/p/original/${
                  s.backdrop_path || s.profile_path || s.poster_path
                }`}
                alt=""
              />

              <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
                {s.name || s.title || s.original_name || s.original_title}
              </h1>
            </div>
          ))
        ) : (
          <h1 className="text-3xl mt-5 text-white font-black text-center">
            Nothing to show
          </h1>
        )}
      </div>

      {/* Part 5 Recommendations and Similar Stuff */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="mt-10 text-3xl font-bold text-white pl-5">
        Recommendations & Similar stuff
      </h1>

      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
