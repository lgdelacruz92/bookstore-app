import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks } from "src/api/books";
import { getFavoritesByUserId } from "src/api/favorites";
import { Books } from "src/types/books";
import { Favorite } from "src/types/favorite";
import { Favorites as FavoritesType } from "src/types/favorites";

const useFavorites = () => {
  const defaultBooks = {
    totalBooks: "0",
    totalPages: "0",
    currentPage: "0",
    books: [],
  };
  const [favorites, setFavorites] = useState<FavoritesType>();
  const [books, setBooks] = useState<Books>(defaultBooks);

  useEffect(() => {
    if (!favorites) {
      return;
    }

    const bookIds = favorites.favorites.map((f: Favorite) => f.book_id);
    getBooks({ bookIds: JSON.stringify(bookIds) })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((resJson) => {
        setBooks(resJson);
      });
  }, [favorites, setBooks]);
  return { books, setFavorites };
};

interface FavoritesProps {}
const Favorites: React.FC<FavoritesProps> = () => {
  const { books, setFavorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    // Get user favorites
    const userString = localStorage.getItem("user");
    const userJson = JSON.parse(userString ?? "");
    const token = localStorage.getItem("token");
    const userId = userJson.uid;

    getFavoritesByUserId(token ?? "", userId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        navigate("/login");
      })
      .then((resjson) => {
        setFavorites(resjson);
      });
  }, [navigate, setFavorites]);
  return <div>{JSON.stringify(books)}</div>;
};

export default Favorites;
