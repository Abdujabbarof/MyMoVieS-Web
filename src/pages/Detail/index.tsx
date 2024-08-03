import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { useParams } from "react-router-dom";

import { Poster, Loader, Error, Section, SkelatonLoader } from "@/common";
import { Genre } from "./components";

import { useGetShowQuery } from "@/services/TMDB";
import { useMotion } from "@/hooks/useMotion";
import { mainHeading, maxWidth, paragraph, watchBtn } from "@/styles";
import { cn, getErrorMessage } from "@/utils/helper";
// import { useTheme } from "@/context/themeContext";


const Detail = () => {
  const { category, id } = useParams();
  const [show, setShow] = useState<Boolean>(false);
  const { fadeDown, staggerContainer } = useMotion();
  // const { theme } = useTheme();

  const sectionStyle = cn(
    `sm:py-[20px] xs:py-[18.75px] py-[16.75px] font-nunito`, maxWidth
  );

  // const linkStyle = cn(
  //   `sm:py-1 py-[2px] sm:text-[14px] xs:text-[12.75px] text-[12px] sm:px-4 px-3 rounded-full  dark:text-gray-300 hover:-translate-y-1 transition-all duration-300`,
  //   theme === "Dark" ? "view-all-btn--dark" : "view-all-btn--light"
  // );

  function convertToEmbedUrl(url: string) {
    if (url.includes("youtube.com")) {
        return url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be")) {
        return url.replace("youtu.be/", "youtube.com/embed/");
    }
    return url;
}

  const {
    data: movie,
    isLoading,
    isFetching,
    isError,
  } = useGetShowQuery({
    id: Number(id),
  });

  // console.log(movie);
  

  const {
    data: trailer,
    isError: trailerErr,
  } = useGetShowQuery({
    id: Number(id),
    trailer: true
  });

  const errorMessage = isError ? getErrorMessage(trailerErr) : "";

  useEffect(() => {
    document.title =
      (movie?.nameOriginal || movie?.nameEn || movie?.nameRu) && !isLoading
        ? movie.nameOriginal ?? movie.nameEn ?? movie?.nameRu
        : "MyMoVieS";


    return () => {
      document.title = "MyMoVieS";
    };
  }, [movie?.nameOriginal, isLoading, movie?.nameEn, movie?.nameRu]);

  const toggleShow = () => setShow((prev) => !prev);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <Error error="Something went wrong!" />;
  }

  const {
    nameOriginal,
    posterUrl: posterPath,
    description,
    nameEn,
    nameRu,
    genres,
  } = movie;

  // console.log(trailer);
  

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.50),rgba(0,0,0,0.8) ,rgba(0,0,0,0.4)),url('${posterPath}'`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat"
  };

  return (
    <>
      <section className="w-full" style={backgroundStyle}>
        <div
          className={`${maxWidth} py-36 flex flex-col sm:flex-row lg:gap-12 md:gap-10 gap-8 justify-center`}
        >
          <Poster title={nameOriginal} posterPath={posterPath} />
          <m.div
            variants={staggerContainer(0.2, 0.4)}
            initial="hidden"
            animate="show"
            className="text-gray-300 max-w-[90%]  md:max-w-[100%] font-nunito flex flex-col lg:gap-5 sm:gap-4 xs:gap-[14px] gap-3 mb-8 flex-1"
          >
            <m.h2
              variants={fadeDown}
              className={cn(mainHeading, "md:max-w-[420px]")}
            >
              {nameOriginal ?? nameEn ?? nameRu}
            </m.h2>

            <m.ul
              variants={fadeDown}
              className="flex flex-row items-center  sm:gap-[14px] xs:gap-3 gap-[6px] flex-wrap"
            >
              {genres?.map((genre: { genre: string }) => {
                return <Genre key={genre.genre} name={genre.genre} />;
              })}
            </m.ul>

            <m.p variants={fadeDown} className={paragraph}>
              <span className="block">
                Year: {movie?.year}
              </span>
              { movie?.ratingImdb && <span className="flex justify-start items-center gap-2">
                  IMDP rating:  <button className={`w-[30px] h-[30px] text-[15px] font-medium rounded-full bg-[#191624] left-1 top-1 flex justify-center items-center ${movie?.ratingImdb < 7 ? "text-[orange]" : "text-[#7eff7e]"}`}>
                    {movie?.ratingImdb}
                  </button> 
                </span>
              }
              <span className="block">
                Duration: {movie?.filmLength} minutes
              </span>

              <span className="py-1 flex justify-start items-center gap-3">
                Country: {
                  movie?.countries.map((country: { country: string }) => {
                    return <Genre key={country.country} name={country.country} />;
                  })
                }
              </span>

              <span className="block">
                {description?.length > 280
                  ? `${show ? description : `${description?.slice(0, 280)}...`}`
                  : description}
              </span>
              <button
                type="button"
                className={cn(
                  `font-bold ml-1 hover:underline transition-all duration-300`,
                  description?.length > 280 ? "inline-block" : "hidden"
                )}
                onClick={toggleShow}
              >
                {!show ? "show more" : "show less"}
              </button>
            </m.p>
            
            <m.div
              variants={fadeDown}
              className="flex flex-row items-center  gap-4 sm:mt-6 xs:mt-5 mt-[18px] "
            >
              <button
                type="button"
                name="watch-trailer"
                className={cn(watchBtn, `text-shadow watch-trailer`)}
                onClick={() => {}}
              >
                Watch trailer
              </button>
              <a
                target="_blank" 
                rel="noreferrer"
                href={movie?.webUrl?.replace("kino", "ss")}
                type="button"
                className={cn(
                  watchBtn,
                  ` bg-[#ff0000] shadow-glow
                text-shadow text-secColor `
                )}
              >
                Watch now
              </a>
            </m.div>

            {/* <Casts casts={credits?.cast || []} /> */}
          </m.div>
        </div>
      </section>

      {
        trailer?.items?.filter((item: { site: string }) => item.site.toLocaleLowerCase() === "youtube").length > 0 && 
        <section className={sectionStyle}>
            <div className="flex flex-row justify-between items-center mb-[22.75px]">
              <div className=" relative">
                <h3 className="sm:text-[22.25px] xs:text-[20px] text-[18.75px] dark:text-gray-50 sm:font-bold font-semibold">Trailers</h3>
                <div className="line" />
              </div>
            </div>
            
            <div className="pb-10">
              {isLoading ? (
                <SkelatonLoader />
              ) : isError ? (
                <Error error={String(errorMessage)} className="h-full text-[18px]" />
              ) : (
                <div className="w-[100%] overflow-x-scroll">
                  <div className="flex justify-start items-start gap-[14px]">
                    {
                      trailer?.items?.slice(0, 10).filter((item: { url: string, site: string, name: string }) => item.site.toLocaleLowerCase() === "youtube").map((trailer: { url: string, site: string, name: string }) => (
                        trailer?.site.toLocaleLowerCase() === "youtube" && 
                        <div className="w-[330px] min-w-[330px]" key={trailer.name}>
                          <div className="max-h-[180px] min-h-[180px]">
                            <iframe
                              src={convertToEmbedUrl(trailer?.url)}
                              title={trailer?.name}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              width={"100%"}
                              height={"100%"}
                            ></iframe>
                          </div>
                          <h3 className="text-white pt-1 pl-[2px]">{trailer?.name}</h3>
                        </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
        </section>
      }

      <Section
        title={`Similar ${category === "movie" ? "movies" : "series"}`}
        category={(nameOriginal ?? nameEn ?? nameRu)}
        className={`${maxWidth}`}
        id={Number(id)}
        showSimilarShows
        type="TOP_100_POPULAR_FILMS"
      />
    </>
  );
};

export default Detail;
