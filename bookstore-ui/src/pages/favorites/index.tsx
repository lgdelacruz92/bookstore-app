import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Heading, TextField, Tooltip } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks } from "src/api/books";
import { getFavoritesByUserId } from "src/api/favorites";
import { Book } from "src/types/book";
import { Books } from "src/types/books";
import { Favorite } from "src/types/favorite";
import { Favorites as FavoritesType } from "src/types/favorites";
import { FavoriteListItem } from "./components/favoriteListItem";

const useFavorites = () => {
  const defaultBooks = {
    totalBooks: "0",
    totalPages: "0",
    currentPage: "0",
    books: [],
  };
  const [favorites, setFavorites] = useState<FavoritesType>();
  const [books, setBooks] = useState<Books>(defaultBooks);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const onSearch = (search: string) => {
    setSearch(search);
    const bookIds = favorites?.favorites.map((f: Favorite) => f.book_id);
    getBooks({ search, page: `${page}`, bookIds: JSON.stringify(bookIds) })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((responseJson) => {
        setBooks(responseJson);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onPageClick = (page: number) => {
    setPage(page);
    const bookIds = favorites?.favorites.map((f: Favorite) => f.book_id);
    getBooks({ search, page: `${page}`, bookIds: JSON.stringify(bookIds) })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((responseJson) => {
        setBooks(responseJson);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  return { books, setFavorites, onSearch, onPageClick };
};

interface FavoritesProps {}
const Favorites: React.FC<FavoritesProps> = () => {
  const { books, setFavorites, onSearch, onPageClick } = useFavorites();
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
  return (
    <div>
      <Heading>Favorites</Heading>
      <div id="favorites-list" className="container mx-auto">
        <Tooltip content="Type search filter.">
          <TextField.Root
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSearch(e.target.value);
            }}
            className="my-4"
            placeholder="Author,Title,Details"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Tooltip>

        <div className="grid grid-cols-6 gap-4">
          {books.books.map((item: Book, i: number) => {
            return (
              <FavoriteListItem
                key={`${item.title}-${i}`}
                book={item}
              ></FavoriteListItem>
            );
          })}
        </div>
        <div className="flex row mt-4">
          {new Array(books.totalPages).fill("").map((_, index) => {
            return (
              <button
                key={`page-button-${index}`}
                onClick={() => onPageClick(index + 1)}
                className={`${
                  books && index === parseInt(books.currentPage) - 1
                    ? "bg-slate-500 text-white rounded"
                    : ""
                } p-2`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
