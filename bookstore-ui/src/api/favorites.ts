import { Favorite } from "../types/favorite";
const favoritesUrl = `${process.env.REACT_APP_FAVORITES_API_URL}/favorites`;

export const getFavoritesByUserId = async (token: string, userId: string) => {
  return await fetch(`${favoritesUrl}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

export const deleteFavorite = async (token: string, favoriteId: string) => {
  await fetch(`${favoritesUrl}/${favoriteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
