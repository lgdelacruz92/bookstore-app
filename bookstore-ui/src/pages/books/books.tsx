import { useCallback, useEffect, useMemo, useState } from "react";
import { BookListItem } from "./components/bookListItem";
import { Book } from "../../types/book";
import { Books as BooksData } from "../../types/books";
import { Heading, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { getBooks } from "src/api/books";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@radix-ui/themes";
import {
  createFavorite,
  deleteFavorite,
  getFavoritesByUserId,
} from "src/api/favorites";
import { Favorite } from "src/types/favorite";
import { Favorites } from "src/types/favorites";

const useFavorites = () => {
  const [favoritesObject, setFavoritesObject] = useState<Favorites>();
  const favoriteBooks = useMemo((): Set<string> => {
    if (!favoritesObject) {
      return new Set();
    }
    const { favorites } = favoritesObject;
    return new Set(favorites.map((f: Favorite) => f.book_id));
  }, [favoritesObject]);

  const bookIdToFavoriteIdMap = useMemo((): Record<string, string> => {
    if (!favoritesObject) {
      return {};
    }
    const { favorites } = favoritesObject;

    return favorites.reduce((prev, f: Favorite) => {
      prev[f.book_id] = f._id;
      return prev;
    }, {} as Record<string, any>);
  }, [favoritesObject]);

  return { favoriteBooks, bookIdToFavoriteIdMap, setFavoritesObject };
};

const Books = () => {
  const [booksData, setBookData] = useState<BooksData>();
  const { favoriteBooks, bookIdToFavoriteIdMap, setFavoritesObject } =
    useFavorites();
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const addToFavorite = async (bookId: string) => {
    const token = localStorage.getItem("token");
    if (favoriteBooks.has(bookId)) {
      const favoriteId = bookIdToFavoriteIdMap[bookId];
      await deleteFavorite(token ?? "", favoriteId);
      initialize();
    } else {
      const userString = localStorage.getItem("user");

      const userJson = JSON.parse(userString ?? "");
      const favoriteData: Favorite = {
        user_id: userJson.uid,
        book_id: bookId,
      };
      await createFavorite(token ?? "", favoriteData);
      initialize();
    }
  };

  const onSearch = (search: string) => {
    setSearch(search);
    getBooks({ search, page: `${page}` })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        navigate("/login");
      })
      .then((responseJson) => {
        setBookData(responseJson);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onPageClick = (page: number) => {
    setPage(page);
    getBooks({ search, page: `${page}` })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        navigate("/login");
      })
      .then((responseJson) => {
        setBookData(responseJson);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initialize = useCallback(() => {
    getBooks({ search, page: `${page}` })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        navigate("/login");
      })
      .then((responseJson) => {
        setBookData(responseJson);
      })
      .catch((err) => {
        console.log(err);
      });

    // Get user favorites
    const userString = localStorage.getItem("user");
    const userJson = JSON.parse(userString ?? "");
    const token = localStorage.getItem("token");
    const userId = userJson.uid;
    getFavoritesByUserId(token ?? "", userId)
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        setFavoritesObject(resJson);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, setFavoritesObject, page, search]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      <Heading>Books library</Heading>

      <div id="books-list" className="container mx-auto">
        <Tooltip content="Type search filter">
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
          {booksData?.books?.map((item: Book, i: number) => {
            return (
              <BookListItem
                key={`${item.title}-${i}`}
                book={item}
                onAddToFavoriteClick={addToFavorite}
                favorites={favoriteBooks}
              ></BookListItem>
            );
          })}
        </div>
        <div className="flex row mt-4">
          {new Array(booksData?.totalPages).fill("").map((_, index) => {
            return (
              <button
                key={`page-button-${index}`}
                onClick={() => onPageClick(index + 1)}
                className={`${
                  booksData && index === parseInt(booksData.currentPage) - 1
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

export default Books;
