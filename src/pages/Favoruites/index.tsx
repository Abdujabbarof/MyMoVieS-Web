import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { MovieCard } from "@/common";
import { smallMaxWidth } from "@/styles";
import { IMovie } from "@/types";
import { CatalogHeader } from "../Catalog/components";
import { useGlobalContext } from "@/context/globalContext";
import { GoSearch } from "react-icons/go";

const FavCatalog = () => {
  const { category } = useParams();
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<IMovie[]>([])
  
  const { likedItems } = useGlobalContext()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    setData(
      likedItems.filter((item) => {
        const searchLower = search.toLocaleLowerCase();
        const nameRu = item?.nameRu?.toLocaleLowerCase() || '';
        const nameEn = item?.nameEn?.toLocaleLowerCase() || '';
  
        return nameRu.includes(searchLower) || nameEn.includes(searchLower);
      })
    );
  }, [search, likedItems]);  

  return (
    <>
      <CatalogHeader category="favourites" />
      
      <section className={`${smallMaxWidth} pb-5 min-h-[100vh]`}>
      <form
        className="text-[14px] lg:py-10 md:pt-9 md:pb-10 sm:pt-8 sm:pb-10  pt-6 pb-8 flex flex-row items-center justify-center"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          className="py-[8px] pl-[20px] pr-[36px]  rounded-full outline-none w-[300px] md:w-[340px]  shadow-md transition-all duration-300 focus:shadow-sm text-[#666] focus:bg-[#ffffff] bg-[#fdfdfd] font-medium dark:bg-[#302d3a] dark:text-primary dark:focus:bg-[#474550]"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder={`Search ${category === "movie" ? "movies" : "favourites"}`}
        />
        <button
          type="submit"
          className="text-[18px] -ml-[32px] text-[#ff0000] z-[1]"
        >
          <GoSearch />
        </button>
      </form>

        { likedItems.length < 1 ? <h1 className="text-center pt-[200px] text-white font-medium">No favourites</h1> :<div
          className="cards_wrap"
        >
          {data.map((movie) => (
            <div
                key={movie.filmId}
                className="card_item flex flex-col xs:gap-4 gap-2 xs:max-w-[170px] max-w-[130px] min-w-[124px] rounded-lg lg:mb-6 md:mb-5 sm:mb-4 mb-[10px]"
              >
                <MovieCard movie={movie} category={String(category)} />
              </div>
            ))}
          </div> }
      </section>
    </>
  );
};

export default FavCatalog;
