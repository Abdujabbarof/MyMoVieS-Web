import { Loader, Error } from "@/common";
import { Hero } from "./components";

import { useGetShowsQuery } from "@/services/TMDB";

const Home = () => {
  const { data, isLoading, isError } = useGetShowsQuery({
    category: "movie",
    type: "TOP_100_POPULAR_FILMS",
    page: 1,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error="Unable to fetch the movies! " />;
  }

  const popularMovies = data?.films;
  
  return (
    <>
      <Hero movies={popularMovies} />
    </>
  );
};

export default Home;
