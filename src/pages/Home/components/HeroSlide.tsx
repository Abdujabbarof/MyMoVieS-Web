import { memo } from 'react';
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Poster } from "@/common";
// import { useGlobalContext } from "@/context/globalContext";
import { mainHeading, maxWidth, watchBtn } from "@/styles";
import { IMovie } from "@/types";
import { cn } from "@/utils/helper";
import { useMotion } from "@/hooks/useMotion";
import { useGetShowQuery } from '@/services/TMDB';

const HeroSlide = ({ movie }: { movie: IMovie }) => {
  // const { getTrailerId, setIsModalOpen } = useGlobalContext();
  const navigate = useNavigate();
  const { fadeDown, staggerContainer } = useMotion();

  const {
    nameEn,
    nameRu,
    posterUrl: posterPath,
    filmId: id,
  } = movie;

  // const showTrailer = () => {
  //   getTrailerId(id);
  //   setIsModalOpen(true);
  // };

  const handleWatchNow = () => {
    navigate(`/movie/${id}`);
  };

  const {
    data: trailer,
  } = useGetShowQuery({
    id: Number(id),
    trailer: true
  });

  return (
    <div
      className={cn(
        maxWidth,
        ` mx-auto flex items-center h-full  flex-row lg:gap-32 sm:gap-20`
      )}
    >
      <m.div
        variants={staggerContainer(0.2, 0.3)}
        initial="hidden"
        animate="show"
        className="text-gray-300 sm:max-w-[80vw] max-w-[90vw]  md:max-w-[420px] font-nunito flex flex-col sm:gap-5 xs:gap-3 gap-[10px] sm:mb-8"
      >
        <m.h2 variants={fadeDown} className={cn(mainHeading)}>
          {nameEn ?? nameRu}
        </m.h2>
        {/* <m.p variants={fadeDown} className={paragraph}>
          {overview.length > 180 ? `${overview.substring(0, 180)}...` : overview}
        </m.p> */}
        <m.div
          variants={fadeDown}
          className="flex flex-row items-center  gap-4 sm:mt-6 xs:mt-5 mt-[18px] "
        >
          <a
            className={cn(watchBtn, `text-shadow watch-trailer`)}
            href={trailer?.items[0]?.url}
            rel='noreferrer'
            target='_blank'
          >
            Watch trailer
          </a>
          <button
            type="button"
            name="watch-now"
            className={cn(
              watchBtn,
              ` bg-[#ff0000] shadow-glow
             text-shadow text-secColor `
            )}
            onClick={handleWatchNow}
          >
            Watch now
          </button>
        </m.div>
      </m.div>

      <Poster title={nameEn ?? nameRu} posterPath={posterPath} className="mr-auto" />
    </div>
  );
};

export default memo(HeroSlide);
