import { useEffect,useState } from "react";
import { getHomeCategories } from "../services/api/categoryApi";

export const useCategories = () =>{
    const [categories,setCategories] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
useEffect(()=>{
    const fetchHomeCatogires = async ()=>{
        try{
            setLoading(true)
           const data =  await  getHomeCategories()
           setCategories(data)
        }

        catch(error){
            setError('error in fetching Categories : ' + error.message)
            console.log('error in fetching Categories : ',error.message)
        }

        finally{
            setLoading(false)
        }
    }
    fetchHomeCatogires()
},[])

return {categories,loading,error}
}