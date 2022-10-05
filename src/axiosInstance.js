import axios from "axios";


const axiosInstance = axios.create({ baseURL: 'http://localhost:6001' });

axiosInstance.get().then((response) => {
  console.log(response.data);
});
export default axiosInstance;