import React, { useCallback, useContext, useState } from "react";
import { API_KEY, TMDB_API_BASE_URL } from "@/utils/config";
import { IMovie } from "@/types";

const context = React.createContext({
  videoId: "",
  setVideoId: (prevValue: string) => { },
  getTrailerId: (id: number | string) => { },
  closeModal: () => { },
  isModalOpen: false,
  showSidebar: false,
  setShowSidebar: (prevValue: boolean) => { },
  setIsModalOpen: (value: boolean) => { },
  likedItems: [] as IMovie[],
  toggleLikeItem: (movie: IMovie) => {},
});

interface Props {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: Props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedItems, setLikedItems] = useState<IMovie[]>(() => {
    const savedLikedItems = localStorage.getItem("likedItems");
    return savedLikedItems ? JSON.parse(savedLikedItems) : [];
  });

  const closeModal = useCallback(() => {
    if (!isModalOpen) return;
    setIsModalOpen(false);
    setVideoId("")
  }, [isModalOpen]);

  const getTrailerId = async (id: number | string) => {
    try {
      const res = await fetch(TMDB_API_BASE_URL + id, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });

      const data = await res.json();
      setVideoId(data.results[0].key);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const toggleLikeItem = (movie: IMovie) => {
    setLikedItems((prevLikedItems) => {
      if (likedItems.some((likedItem) => likedItem.filmId === movie.filmId)) {
        localStorage.setItem("likedItems", JSON.stringify(prevLikedItems.filter((item) => item.filmId !== movie.filmId)))
        return prevLikedItems.filter((item) => item.filmId !== movie.filmId);
      } else {
        localStorage.setItem("likedItems", JSON.stringify([...prevLikedItems, movie]))
        return [...prevLikedItems, movie];
      }
    });
  };

  return (
    <context.Provider
      value={{
        getTrailerId,
        videoId,
        closeModal,
        isModalOpen,
        setVideoId,
        showSidebar,
        setShowSidebar,
        setIsModalOpen,
        likedItems,
        toggleLikeItem
      }}
    >
      {children}
    </context.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalContext = () => {
  return useContext(context);
};
