import { Favorite } from "../types/favorite";
const favoritesUrl = `${process.env.REACT_APP_FAVORITES_API_URL}/favorites`;

export const getFavoritesByUserId = async (userId: string) => {
  return await fetch(`${favoritesUrl}/${userId}`, {
    method: "GET",
  });
};

export const createFavorite = async (token: string, favoriteData: Favorite) => {
  await fetch(`${favoritesUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(favoriteData),
  });
};
