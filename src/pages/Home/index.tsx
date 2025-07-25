import { Loader, Error } from "@/common";
import { Hero } from "./components";

import { useGetShowsQuery } from "@/services/TMDB";

const Home = () => {
  const { data, isLoading, isError } = useGetShowsQuery({
    category: "movie",
    type: "FILM",
    page: 1,
  });

  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error="Unable to fetch the movies! " />;
  }

  const popularMovies = data?.items;

  return (
    <>
      <Hero movies={popularMovies} />
    </>
  );
};

export default Home;
