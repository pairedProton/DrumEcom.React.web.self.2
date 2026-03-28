import axios from "axios";

const axiosInstance = axios.create(
    {baseURL:"https://spectrumms.in/taurus_organic/api",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
        },
        timeout:10000,
        
    }
)

export default axiosInstance