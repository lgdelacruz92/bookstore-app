import { useEffect, useState } from "react";
import { BookListItem } from "./components/bookListItem";
import { Book } from "bookstore-shared";
const Books = () => {
  const [books, setBooks] = useState<Array<Book>>([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/books`)
      .then((res) => {
        return res.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        setBooks(responseJson);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div id="books-list" className="grid grid-cols-4 gap-4">
      {books.map((item: { title: string }, i: number) => {
        return (
          <BookListItem key={`${item.title}-${i}`}>{item.title}</BookListItem>
        );
      })}
    </div>
  );
};

export default Books;
