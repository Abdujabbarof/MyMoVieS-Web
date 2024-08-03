import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import HeroSlide from "./HeroSlide";
import { IMovie } from "@/types";

const Hero = ({ movies }: { movies: IMovie[] }) => (
  <Swiper
    className="mySwiper h-screen w-full"
    loop={true}
    slidesPerView={1}
    autoplay={{
      delay: 5000,
      disableOnInteraction: false,
    }}
    modules={[Autoplay]}
  >
    {movies.map((movie) => {
      return (
        <SwiperSlide
          key={movie.filmId}
          style={{
            backgroundImage: `
              linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.5)),url('${movie.posterUrl}'`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
          }}
          className=" h-full w-full "
        >
          {({ isActive }) => (isActive ? <HeroSlide movie={movie} /> : null)}
        </SwiperSlide>
      );
    })}
  </Swiper>
);

export default Hero;
