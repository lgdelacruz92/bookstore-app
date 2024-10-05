import { Favorite } from "./favorite";
export interface Favorites {
  totalFavorites: string;
  totalPages: string;
  currentPage: string;
  favorites: Favorite[];
}
