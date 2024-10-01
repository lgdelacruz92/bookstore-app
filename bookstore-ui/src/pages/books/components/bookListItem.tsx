import { Book } from "bookstore-shared";
import { BookListItemImage } from "./bookListItemImage";

interface BookListItemProps {
  book: Book;
}

export const BookListItem = ({ book, ...rest }: BookListItemProps) => {
  const { title, author, details, imgUrl } = book;
  return (
    <div {...rest} className="bg-slate-500 h-[300px]">
      <div>{title}</div>
      <div>{author}</div>
      <div>{details}</div>
      <BookListItemImage title={title} imgUrl={imgUrl ?? ""} />
    </div>
  );
};
