import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFavourites = () => {
  const [favourites, setFavourites] = useState([]);

  const fetchFavourites = useCallback(async () => {
    const token = localStorage.getItem("token_organic"); // move inside useCallback

    try {
      const res = await axios.get("http://localhost:3035/api/v1/user/favourites", {
        headers: {
          api_key: "123456789",
          token: `${token}`,
        },
      });
      setFavourites(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching favourites:", error);
      setFavourites([]);
    }
  }, []); 

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  return favourites;
};

export default useFavourites;
