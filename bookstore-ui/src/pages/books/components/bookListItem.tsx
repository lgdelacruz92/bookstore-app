import { Book } from "bookstore-shared";
import { transform } from "typescript";

interface BookListItemProps {
  book: Book;
}

export const BookListItem = ({ book, ...rest }: BookListItemProps) => {
  const { title, author, details, imgUrl } = book;
  const backgroundImageStyle = {
    backgroundImage: `url(${imgUrl || ""})`,
    backgroundSize: "cover", // Ensures the image covers the container
    backgroundPosition: "center", // Centers the image
    backgroundRepeat: "no-repeat", // Prevents tiling of the image
    overflow: "hidden",
  };

  return (
    <div
      {...rest}
      className="bg-slate-500 h-[300px] rounded-lg"
      style={backgroundImageStyle}
    >
      <div className="bg-gray-300 p-2 bg-opacity-30">
        <div className="font-bold text-xl text-slate-800 pt-4">{title}</div>
        <div className="font-bold italic text-slate-700 mt-2">{author}</div>
        <div className="mt-2 pb-2 text-slate-800">{details}</div>
      </div>
    </div>
  );
};
