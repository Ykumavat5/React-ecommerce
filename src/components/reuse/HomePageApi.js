import { useCallback } from "react";
import axios from "axios";

const useHome = () => {
    const homePage = useCallback(async () => {
        const token = localStorage.getItem("token_organic");

        try {
            const response = await axios.post(
                "http://localhost:3035/api/v1/user/homePage",
                {},
                {
                    headers: {
                        api_key: "123456789",
                        token
                    },
                }
            );
            
            return { success: true, data: response.data };
            
        } catch (error) {

            console.error("Error fetching home page data:", error);
            return { success: false, error };
        }
    }, []);

    return { homePage };
};

export default useHome;
