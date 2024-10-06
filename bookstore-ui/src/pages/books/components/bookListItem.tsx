import { HeartIcon } from "@components/icons/heartIcon";
import { Book } from "../../../types/book";
import { Tooltip } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

interface BookListItemProps {
  book: Book;
  onAddToFavoriteClick: (bookId: string) => void;
  favorites: Set<string>;
}

export const BookListItem = ({
  book,
  onAddToFavoriteClick,
  favorites,
  ...rest
}: BookListItemProps) => {
  const { title, author, imgUrl, _id } = book;
  const backgroundImageStyle = {
    backgroundImage: `url(${imgUrl || ""})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  };
  const navigate = useNavigate();

  const onBookClick = () => {
    navigate(`/home/details/${_id}`);
  };

  return (
    <div
      {...rest}
      className="bg-slate-500 h-[300px] rounded-lg"
      style={backgroundImageStyle}
      onClick={onBookClick}
    >
      <div className="bg-gray-300 p-2 bg-opacity-30 relative">
        <Tooltip content="add to favorites">
          <div
            className="absolute top-1 right-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onAddToFavoriteClick(_id);
            }}
          >
            <HeartIcon
              fill={`${favorites.has(_id) ? "red" : "none"}`}
              stroke={`${favorites.has(_id) ? "red" : "gray"}`}
              size="30"
            />
          </div>
        </Tooltip>
        <div className="font-bold text-xl text-slate-800 pt-4">{title}</div>
        <div className="font-bold italic text-slate-700 mt-2">{author}</div>
      </div>
    </div>
  );
};
