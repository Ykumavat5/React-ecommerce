// src/data/useCategories.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useCategories = () => {
  const [categorys, setCategorys] = useState([]);

  const fetchCategorys = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3035/api/v1/user/categorys", {
        headers: { api_key: "123456789" },
      });
      setCategorys(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching categorys:", error);
      setCategorys([]);
    }
  }, []);

  useEffect(() => {
    fetchCategorys();
  }, [fetchCategorys]);

  return categorys;
};

export default useCategories;
