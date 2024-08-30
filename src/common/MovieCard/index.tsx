import { Link } from "react-router-dom";
import { FaYoutube, FaRegHeart, FaHeart } from "react-icons/fa";

import Image from "../Image";
import { IMovie } from "@/types";
import { useMediaQuery } from "usehooks-ts";
import { useGlobalContext } from "@/context/globalContext";

const MovieCard = ({
  movie,
  category,
}: {
  movie: IMovie;
  category: string;
}) => {
  const { posterUrl: poster_path, nameEn: original_title, nameRu, nameEn, filmId: id, rating } = movie;
  const isMobile = useMediaQuery("(max-width: 380px)");
  const { likedItems, toggleLikeItem } = useGlobalContext()
  
  return (
    <>
      <Link
        to={`/${category}/${id}`}
        className="dark:bg-[#1f1f1f] bg-[#f5f5f5] rounded-lg relative group xs:max-w-[170px] max-w-[130px] min-w-[130px] select-none xs:h-[220px] h-[170px] overflow-hidden"
      >
        <Image
          height={!isMobile ? 250 : 170}
          width={170}
          src={`${poster_path}`}
          alt={original_title}
          className="object-cover rounded-lg drop-shadow-md shadow-md group-hover:shadow-none group-hover:drop-shadow-none transition-all duration-300 ease-in-out"
          effect="zoomIn"
        />

        <div className="absolute top-0 left-0 w-[100%] min-w-[130px] h-full group-hover:opacity-100 opacity-0 bg-[rgba(0,0,0,0.6)] transition-all duration-300 rounded-lg flex items-center justify-center">
          <div className="xs:text-[48px] text-[42px] text-[#ff0000] scale-[0.4] group-hover:scale-100 transition-all duration-300 ">
            <FaYoutube />
          </div>
        </div>

        {(rating && rating > 1) && <button className={`w-[30px] h-[30px] text-[15px] font-medium rounded-full bg-[#191624] absolute left-1 top-1 flex justify-center items-center ${rating < 7 ? "text-[orange]" : "text-[#7eff7e]"} rotate-[-25deg]`}>
          {rating}
        </button> }
      </Link>

      <div className="flex justify-between gap-2 items-start">
        <h4 className="dark:text-gray-300 text-start flex justify-between items-start cursor-default sm:text-base xs:text-[14.75px] text-[14px] font-medium truncate">
          {original_title ?? nameEn ?? nameRu}
        </h4>

        <button className="h-[30px] rounded-full" onClick={() => toggleLikeItem(movie)}>
          {   likedItems.some((likedItem) => likedItem.filmId === movie.filmId)  ?  <FaHeart className="text-[#ff0000] text-[18px]" /> : <FaRegHeart className="text-[white] text-[18px]"  />  }
        </button>
      </div>

    </>
  );
};

export default MovieCard
