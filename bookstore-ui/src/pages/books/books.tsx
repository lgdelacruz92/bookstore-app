import { useEffect, useState } from "react";
import { BookListItem } from "./components/bookListItem";
import { Book } from "../../types/book";
import { Books as BooksData } from "../../types/books";
import { Heading, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { getBooks } from "src/api/books";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@radix-ui/themes";

const Books = () => {
  const [booksData, setBookData] = useState<BooksData>();
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const onSearch = (search: string) => {
    setSearch(search);
    getBooks({ search })
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

  useEffect(() => {
    getBooks({})
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
  }, [navigate]);

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
            placeholder="Search the books..."
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
