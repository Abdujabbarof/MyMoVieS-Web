import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_KEY, API_URL_SEARCH, TMDB_API_BASE_URL } from "@/utils/config";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_API_BASE_URL, prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("X-API-KEY", API_KEY);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getShows: builder.query({
      query: ({
        category,
        type,
        searchQuery,
        page,
        showSimilarShows,
        id,
      }: {
        category: string | undefined;
        type?: string;
        page?: number;
        searchQuery?: string;
        showSimilarShows?: boolean;
        id?: number;
      }) => {
        if (searchQuery) {
          return `${API_URL_SEARCH}${searchQuery}`;
        }

        if (showSimilarShows) {
          return `${API_URL_SEARCH}${category?.replaceAll("-", " ").replaceAll(":", "").split(" ").splice(0, 2).join(" ")}`;
        }

        let url = `top?type=${type}&page=${page}`
        return url;
      },
    }),

    getShow: builder.query({
      query: ({ id, trailer }: { id: number; trailer?: boolean }) => {
        if (trailer) {
          return `/${id}/videos`
        }
        return `/${id}`
      },
    }),
  }),
});

export const { useGetShowsQuery, useGetShowQuery } = tmdbApi;
