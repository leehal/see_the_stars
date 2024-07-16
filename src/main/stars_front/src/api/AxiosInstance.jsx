import axios from "axios";
import Common from "../utils/Common";

const AxiosInstance = axios.create({});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Common.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  async (response) => {
    const now = Date.now();
    const refreshExpiresIn = parseInt(Common.getRefreshExpiresIn(), 10);
    const accessExpiresIn = parseInt(Common.getExpiresIn(), 10);

    if (now > refreshExpiresIn) {
      console.log("리프레시토큰 만료");
      localStorage.clear();
      // window.location.href = "/";
      return Promise.reject(new Error("Refresh token expired"));
    }

    if (
      (!isNaN(refreshExpiresIn) && isNaN(refreshExpiresIn)) ||
      now > accessExpiresIn
    ) {
      console.log("엑세스토큰 만료");
      try {
        const newToken = await Common.handleUnauthorized();
        if (newToken) {
          response.config.headers.Authorization = `Bearer ${Common.getAccessToken()}`;
          return AxiosInstance.request(response.config);
        } else {
          localStorage.clear();
          // window.location.href = "/";
          return Promise.reject(new Error("Failed to refresh token"));
        }
      } catch (err) {
        console.log("에러");
        localStorage.clear();
        // window.location.href = "/";
        return Promise.reject(err);
      }
    }
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("권한없음");
      localStorage.clear();
      // window.location.href = "/";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
