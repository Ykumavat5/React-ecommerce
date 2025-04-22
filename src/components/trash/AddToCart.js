import { useCallback } from "react";
import axios from "axios";

const useCart = () => {
    const addToCart = useCallback(async (product_id, quantity = 1) => {
        const token = localStorage.getItem("token_organic");

        try {
            const response = await axios.post(
                "http://localhost:3035/api/v1/user/cart/add",
                { product_id, quantity },
                {
                    headers: {
                        api_key: "123456789",
                        token,
                    },
                }
            );
            console.log('Product added to cart:', response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error adding item to cart:", error);
            return { success: false, error };
        }
    }, []);

    return { addToCart };
};

//  home 1.ad banner 2.main banner 3. newsletter 
export default useCart;
