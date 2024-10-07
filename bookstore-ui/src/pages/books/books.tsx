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
import { PageSelect } from "@components/pageSelect";

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
    setPage(1);
    getBooks({ search, page: "1" })
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

      <div id="books-list" className="mx-auto">
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

        <div className="grid grid-cols-1 gap-0 gap-y-4 lg:grid-cols-6 lg:gap-4">
          {booksData &&
            booksData?.books?.map((item: Book, i: number) => {
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
          {booksData && (
            <PageSelect
              totalPages={parseInt(booksData.totalPages)}
              currentPage={parseInt(booksData.currentPage)}
              onPageClick={onPageClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
