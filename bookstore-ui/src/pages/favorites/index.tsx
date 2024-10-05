import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoritesByUserId } from "src/api/favorites";
import { Favorites as FavoritesType } from "src/types/favorites";

interface FavoritesProps {}
const Favorites: React.FC<FavoritesProps> = () => {
  const [favorites, setFavorites] = useState<FavoritesType>();
  const navigate = useNavigate();

  useEffect(() => {
    // Get user favorites
    const userString = localStorage.getItem("user");
    const userJson = JSON.parse(userString ?? "");
    const token = localStorage.getItem("token");
    const userId = userJson.uid;

    getFavoritesByUserId(token ?? "", userId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        navigate("/login");
      })
      .then((resjson) => {
        setFavorites(resjson);
      });
  }, [navigate]);
  return <div>Favorites</div>;
};

export default Favorites;
