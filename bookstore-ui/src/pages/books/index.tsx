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
        setBooks(responseJson);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div id="books-list" className="container mx-auto">
      <div className="grid grid-cols-4 gap-4">
        {books.map((item: Book, i: number) => {
          return (
            <BookListItem key={`${item.title}-${i}`} book={item}></BookListItem>
          );
        })}
      </div>
    </div>
  );
};

export default Books;
