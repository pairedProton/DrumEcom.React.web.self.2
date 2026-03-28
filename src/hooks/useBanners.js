import { useState,useEffect } from "react";
import { getHomeBanners } from "../services/api/bannerApi";

export const useBanners = () => {
    const [banners,setBanners] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    useEffect(()=>{
        const fetchHomeBanners = async () => {
            try{
                setLoading(true)
                const data = await getHomeBanners()
                setBanners(data)
            }

            catch(error){
                setError("error fetching banners : " + error.message)
                console.log("error fetching banners : ",error.message)
            }

            finally{
                setLoading(false)
            }
        }
        fetchHomeBanners()
    },[])

    return {banners,loading,error}
}