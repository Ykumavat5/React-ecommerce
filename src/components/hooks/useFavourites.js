import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useFavourites = () => {
  const [favourites, setFavourites] = useState([]);

  const fetchFavourites = useCallback(async () => {
    const token = localStorage.getItem("token_organic");
    try {
      const res = await axios.get("http://localhost:3035/api/v1/user/favourites", {
        headers: {
          api_key: "123456789",
          token,
        },
      });
      const productIds = Array.isArray(res.data.data?.result)
        ? res.data.data.result.map(item => item.product_id)
        : [];
      setFavourites(productIds);
    } catch (error) {
      console.error("Error fetching favourites:", error);
      setFavourites([]);
    }
  }, []);

  // const toggleFavourite = async (productId) => {
  //   const token = localStorage.getItem("token_organic");
  //   const isFav = favourites.includes(productId);

  //   // Update local state optimistically
  //   setFavourites(prev =>
  //     isFav ? prev.filter(id => id !== productId) : [...prev, productId]
  //   );

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:3035/api/v1/user/toggleFavourite",
  //       { product_id: productId },
  //       { headers: { api_key: "123456789", token } }
  //     );
  //     if (res.status === 200) console.log(res.data.message);
  //   } catch (error) {
  //     console.error("Error toggling favourite:", error);
  //     // Revert UI on error
  //     setFavourites(prev =>
  //       isFav ? [...prev, productId] : prev.filter(id => id !== productId)
  //     );
  //   }
  // };

  const toggleFavourite = async (productId) => {
    const token = localStorage.getItem("token_organic");
    const isFav = favourites.includes(productId);

    // Update local state optimistically
    setFavourites(prev =>
      isFav ? prev.filter(id => id !== productId) : [...prev, productId]
    );

    try {
      const res = await axios.post(
        "http://localhost:3035/api/v1/user/toggleFavourite",
        { product_id: productId },
        { headers: { api_key: "123456789", token } }
      );

      if (res.data.code === 200) {
        toast.success(isFav ? "Product removed from favourites" : "Product added to favourites", {
          toastId: `fav-${productId}`,
        });
      } else {
        toast.error("Failed to toogle favourite.");
      }

    } catch (error) {
      console.error("Error toggling favourite:", error);

      // Revert UI on error
      setFavourites(prev =>
        isFav ? [...prev, productId] : prev.filter(id => id !== productId)
      );

      toast.error("Something went wrong with your favourite action.", {
        toastId: `fav-error-${productId}`,
      });
    }
  };


  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  return [favourites, toggleFavourite];
};

export default useFavourites;
