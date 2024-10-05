import { HeartIcon } from "@components/icons/heartIcon";
import { Book } from "../../../types/book";
import { Tooltip } from "@radix-ui/themes";
import { Favorite } from "src/types/favorite";
import { createFavorite } from "src/api/favorites";

interface BookListItemProps {
  book: Book;
}

export const BookListItem = ({ book, ...rest }: BookListItemProps) => {
  const { title, author, details, imgUrl, _id } = book;
  const backgroundImageStyle = {
    backgroundImage: `url(${imgUrl || ""})`,
    backgroundSize: "cover", // Ensures the image covers the container
    backgroundPosition: "center", // Centers the image
    backgroundRepeat: "no-repeat", // Prevents tiling of the image
    overflow: "hidden",
  };

  const addToFavorite = () => {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    const userJson = JSON.parse(userString ?? "");
    const favoriteData: Favorite = {
      user_id: userJson.uid,
      book_id: _id,
    };
    createFavorite(token ?? "", favoriteData);
  };

  return (
    <div
      {...rest}
      className="bg-slate-500 h-[300px] rounded-lg"
      style={backgroundImageStyle}
    >
      <div className="bg-gray-300 p-2 bg-opacity-30 relative">
        <Tooltip content="add to favorites">
          <div
            className="absolute top-1 right-1 cursor-pointer"
            onClick={addToFavorite}
          >
            <HeartIcon fill="none" stroke="gray" size="30" />
          </div>
        </Tooltip>
        <div className="font-bold text-xl text-slate-800 pt-4">{title}</div>
        <div className="font-bold italic text-slate-700 mt-2">{author}</div>
        <div className="mt-2 pb-2 text-slate-800">{details}</div>
      </div>
    </div>
  );
};
