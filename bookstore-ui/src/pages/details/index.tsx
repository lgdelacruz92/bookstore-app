import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Box, Flex, Heading, Tooltip } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "src/api/books";
import { Book } from "src/types/book";

const Details = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book>();
  const navigate = useNavigate();
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
      <div className="flex justify-start mb-8">
        <Tooltip content="back">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="border-solid border-2 rounded-full"
          >
            <ChevronLeftIcon width={24} height={24} />
          </button>
        </Tooltip>
      </div>
      {book ? (
        <Flex className="gap-x-4">
          <Box className="flex-1">
            <Heading className="text-left">{book.title}</Heading>
            <div className="text-xl mt-4 text-left">Author: {book.author}</div>
            <div className="mt-4">
              <div className="text-xl font-bold text-left">Details:</div>
              <div className="text-xl mt-4 text-left">{book.details}</div>
            </div>
          </Box>
          <Box className="flex-1">
            <img src={book.imgUrl} alt={`${book.title}`} />
          </Box>
        </Flex>
      ) : null}
    </div>
  );
};
export default Details;
