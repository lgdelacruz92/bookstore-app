import { useEffect, useState } from "react";
import { BookListItem } from "./components/bookListItem";
import { Books as BooksData, Book } from "bookstore-shared";
import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
const Books = () => {
  const [booksData, setBookData] = useState<BooksData>();
  const [search, setSearch] = useState<string>("");

  const onSearch = (search: string) => {
    const urlParams = new URLSearchParams();
    urlParams.set("search", `${search}`);
    setSearch(search);
    fetch(`${process.env.REACT_APP_API_URL}/books?${urlParams.toString()}`)
      .then((res) => {
        return res.json();
      })
      .then((responseJson) => {
        setBookData(responseJson);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onPageClick = (page: number) => {
    const urlParams = new URLSearchParams();
    urlParams.set("page", `${page}`);
    urlParams.set("search", search);
    fetch(`${process.env.REACT_APP_API_URL}/books?${urlParams.toString()}`)
      .then((res) => {
        return res.json();
      })
      .then((responseJson) => {
        setBookData(responseJson);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/books`)
      .then((res) => {
        return res.json();
      })
      .then((responseJson) => {
        setBookData(responseJson);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="books-list" className="container mx-auto">
      <TextField.Root
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onSearch(e.target.value);
        }}
        className="my-4"
        placeholder="Search the docs…"
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <div className="grid grid-cols-6 gap-4">
        {booksData?.books.map((item: Book, i: number) => {
          return (
            <BookListItem key={`${item.title}-${i}`} book={item}></BookListItem>
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
  );
};

export default Books;
