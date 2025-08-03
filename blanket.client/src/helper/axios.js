import axios from "axios";

//const BASE_URL = "http://aircondition.runasp.net/api/";

const BASE_URL = "https://localhost:7011/api/";
//const BASE_URL = "http://localhost:5150/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
// });

export default axiosInstance;
