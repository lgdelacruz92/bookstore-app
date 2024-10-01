import { useEffect, useState } from "react";
import { BookListItem } from "./components/bookListItem";
import { Books as BooksData, Book } from "bookstore-shared";
const Books = () => {
  const [booksData, setBookData] = useState<BooksData>();
  const onPageClick = (page: number) => {
    const urlParams = new URLSearchParams();
    urlParams.set("page", `${page}`);
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
