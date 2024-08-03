export interface ITheme {
  title: string;
  icon: IconType;
}

export interface INavLink extends ITheme {
  path: string;
}

// export interface IMovie {
//   id: string;
//   poster_path: string;
//   original_title: string;
//   name: string;
//   overview: string;
//   backdrop_path: string
// }

export interface Movie {
  completed: boolean;
  countries: Country[];
  coverUrl: string | null;
  description: string;
  editorAnnotation: string | null;
  endYear: number | null;
  filmLength: number;
  genres: Genre[];
  has3D: boolean;
  hasImax: boolean;
  imdbId: string;
  isTicketsAvailable: boolean;
  kinopoiskHDId: number | null;
  kinopoiskId: number;
  lastSync: string;
  logoUrl: string | null;
  nameEn: string | null;
  nameOriginal: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  productionStatus: string;
  ratingAgeLimits: string | null;
  ratingAwait: number | null;
  ratingAwaitCount: number;
  ratingFilmCritics: number | null;
  ratingFilmCriticsVoteCount: number;
  ratingGoodReview: number | null;
  ratingGoodReviewVoteCount: number;
  ratingImdb: number | null;
  ratingImdbVoteCount: number;
  ratingKinopoisk: number | null;
  ratingKinopoiskVoteCount: number;
  ratingMpaa: string;
  ratingRfCritics: number | null;
  ratingRfCriticsVoteCount: number;
  reviewsCount: number;
  serial: boolean;
  shortDescription: string | null;
  shortFilm: boolean;
  slogan: string | null;
  startYear: number | null;
  type: string;
  webUrl: string;
  year: number;
}


export interface IMovie {
  countries: Country[];
  filmId: number;
  filmLength: string;
  genres: Genre[];
  isAfisha: number;
  isRatingUp: boolean | null;
  nameEn: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  rating: null | number;
  ratingChange: number | null;
  ratingVoteCount: number;
  year: string;
}

