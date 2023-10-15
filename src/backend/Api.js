import axios from "axios";

const api = process.env.REACT_APP_BASE_URL;
const axiosfetch = axios.create({
  baseURL: api,
});
const refreshAccessToken = async () => {
  let token = localStorage.getItem("refreshtoken");
  try {
    const response = await axiosfetch("/refreshtoken", {
      method: "POST",
      data: {
        refreshToken: token,
      },
    });
    const newAccessToken = response.data.accessToken;
    // Store the new access token
    localStorage.setItem("token", newAccessToken);
    localStorage.setItem("refreshtoken", response.data.refreshToken);
    return newAccessToken;
  } catch (error) {
    // Handle token refresh failure (e.g., redirect to login)
    localStorage.removeItem("token");
    localStorage.removeItem("signinuser");
    localStorage.removeItem("refreshtoken");
    window.location.href = "/signin";
    console.error("Token refresh failed:", error);
    throw error;
  }
};

// Axios request interceptor to attach the access token to requests
axiosfetch.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor to handle token expiration and refresh
axiosfetch.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosfetch;
