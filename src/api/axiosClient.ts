import axios from "axios";

const axiosClient = axios.create({
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.defaults.baseURL = process.env.REACT_APP_API;
axiosClient.interceptors.request.use(async (config: any) => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
  if (accessToken) {
    config.headers.common.Authorization = `Bearer ${JSON.parse(accessToken)}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
