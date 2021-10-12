import axios from "axios";

let instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-type": "application/json"
  }
});

function getLocalAccessToken() {
  const accessToken = window.localStorage.getItem("access_token");
  return accessToken;
}

instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      //config.headers["x-access-token"] = token;
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance