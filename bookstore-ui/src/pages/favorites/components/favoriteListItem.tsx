import { useNavigate } from "react-router-dom";
import { Book } from "src/types/book";

interface FavoriteListItemProps {
  book: Book;
}

export const FavoriteListItem: React.FC<FavoriteListItemProps> = ({ book }) => {
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
    navigate(`/details/${_id}`);
  };

  return (
    <div
      className="bg-slate-500 h-[300px] rounded-lg"
      style={backgroundImageStyle}
      onClick={onBookClick}
    >
      <div className="bg-gray-300 p-2 bg-opacity-30 relative">
        <div className="font-bold text-xl text-slate-800 pt-4">{title}</div>
        <div className="font-bold italic text-slate-700 mt-2">{author}</div>
      </div>
    </div>
  );
};
