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
import { PageSelect } from "@components/pageSelect";

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

  const onSearch = (search: string) => {
    if (favorites && favorites.favorites.length === 0) {
      return;
    }
    setSearch(search);
    const bookIds = favorites?.favorites.map((f: Favorite) => f.book_id);
    getBooks({ search, page: "1", bookIds: JSON.stringify(bookIds) })
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

    if (favorites.favorites.length === 0) {
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

        <div className="grid grid-cols-1 gap-0 gap-y-4 lg:grid-cols-6 lg:gap-4">
          {books &&
            books.books.map((item: Book, i: number) => {
              return (
                <FavoriteListItem
                  key={`${item.title}-${i}`}
                  book={item}
                ></FavoriteListItem>
              );
            })}
        </div>
        <div className="flex row mt-4">
          {books ? (
            <PageSelect
              totalPages={parseInt(books.totalPages)}
              currentPage={parseInt(books.currentPage)}
              onPageClick={onPageClick}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
