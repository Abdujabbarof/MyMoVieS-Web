import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import MovieCard from "../MovieCard";
import { IMovie } from "@/types";

interface MoviesSlidesProps {
  movies: IMovie[];
  category: string;
}

const MoviesSlides: FC<MoviesSlidesProps> = ({ movies, category }) => (
  <Swiper slidesPerView="auto" spaceBetween={15} className="mySwiper">
    {movies?.map((movie, index) => {
      return (
        <SwiperSlide
          key={movie?.kinopoiskId + String(index)}
          className="flex mt-1 flex-col xs:gap-[14px] gap-2 max-w-[170px]  rounded-lg"
        >
          <MovieCard movie={movie} category={category} />
        </SwiperSlide>
      );
    })}
  </Swiper>
);

export default MoviesSlides;
