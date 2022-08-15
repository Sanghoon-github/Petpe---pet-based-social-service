import axios from "../../node_modules/axios/index";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("http://127.0.0.1:8000/accounts/token/refresh/", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, accessToken: response.data.access_Token };
    });
    return response.data.access_Token;
  };
  return refresh;
};

export default useRefreshToken;