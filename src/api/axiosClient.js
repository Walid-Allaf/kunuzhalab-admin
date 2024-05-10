import Axios from "axios";

const axiosClient = Axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": "en-US,en;q=0.9,ar-EG;q=0.8,ar;q=0.7,nl;q=0.6",
  },
});

export default axiosClient;
