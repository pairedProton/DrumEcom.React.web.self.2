import { useState,useEffect } from "react";
import { getPopularProducts } from "../services/api/popularProductsApi";

export const usePopularProducts = () =>{
    const [popularProducts,setPopularProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                const data = await getPopularProducts();
                setPopularProducts(data);
                
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPopularProducts();
    }, []);

    return {popularProducts,loading,error};
}