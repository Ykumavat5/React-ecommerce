import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFavourites = () => {
  const [favourites, setFavourites] = useState([]);

  const fetchFavourites = useCallback(async () => {
    const token = localStorage.getItem("token_organic");

    try {
      const res = await axios.get("http://localhost:3035/api/v1/user/favourites", {
        headers: {
          api_key: "123456789",
          token: `${token}`,
        },
      });
      const productIds = Array.isArray(res.data.data?.result)
        ? res.data.data.result.map(item => item.product_id)
        : [];
      // console.log("use fav called");

      setFavourites(productIds);
    } catch (error) {
      console.error("Error fetching favourites:", error);
      setFavourites([]);
    }
  }, []);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  return [favourites, setFavourites];
};

export default useFavourites;
