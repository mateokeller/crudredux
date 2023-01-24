import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://functional-false-cobbler.glitch.me/",
});

export default axiosClient;
