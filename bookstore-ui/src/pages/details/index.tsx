import { Box, Flex, Heading } from "@radix-ui/themes";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "src/api/books";
import { Book } from "src/types/book";

const Details = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book>();
  useEffect(() => {
    if (!bookId) {
      return;
    }
    getBookById(bookId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((resJson) => {
        setBook(resJson);
      });
  }, [bookId]);
  return (
    <div>
      {book ? (
        <Flex className="gap-x-4">
          <Box>
            <Heading className="text-left">{book.title}</Heading>
            <div className="text-xl mt-4 text-left">Author: {book.author}</div>
            <div className="mt-4">
              <div className="text-xl font-bold text-left">Details:</div>
              <div className="text-xl mt-4 text-left">{book.details}</div>
            </div>
          </Box>
          <img src={book.imgUrl} alt={`${book.title}`} />
        </Flex>
      ) : null}
    </div>
  );
};
export default Details;
