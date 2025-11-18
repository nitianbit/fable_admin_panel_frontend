import { authApi } from "./auth";
import { useAuth } from "../store/useAuth";
import { refreshAuth } from "../store/refToken";
import TokenService from "../services/token.service";

const useAuthapi = () => {
  const auth = useAuth();
  const refreshState = refreshAuth();

  // Helper function to get access token
  const getAccessToken = () => {
    // Try to get from store first (for regular users)
    if (auth.authToken && auth.authToken.accessToken) {
      return auth.authToken.accessToken;
    }
    // Fallback to localStorage (for operators or when store is not initialized)
    const token = TokenService.getLocalAccessToken();
    if (token) {
      return token;
    }
    // Check if authToken is directly a string
    if (typeof auth.authToken === "string") {
      return auth.authToken;
    }
    return null;
  };

  authApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      //const { config: originalRequest } = error;
      const prevReq = error?.config;
      if (error?.response?.status === 401 && !prevReq?.sent) {
        prevReq.sent = true;
        try {
          const reAuth = await refreshState.refresh();
          //  console.log("reAuth", reAuth);
          if (reAuth) {
            prevReq.headers["Authorization"] = `Bearer ${reAuth}`;
            return authApi(prevReq);
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // If refresh fails, redirect to appropriate login page
          const userType = localStorage.getItem("userType") || "user";
          if (userType === "operator") {
            window.location.href = "/operator-login";
          } else {
            window.location.href = "/auth/login";
          }
        }
      }
      return Promise.reject(error);
    }
  );
  authApi.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        const token = getAccessToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          console.warn("No access token available for request");
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  return authApi;
};

export default useAuthapi;
