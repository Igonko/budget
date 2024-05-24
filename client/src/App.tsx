import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useAppDispatch } from "./store/hooks";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper";
import { toast } from "react-toastify";
import { AuthService } from "./services/auth.service";
import { login, logout } from "./store/user/userSlice";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAuth();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();

    try {
      if (token) {
        const data = await AuthService.getProfile();
        data ? dispatch(login(data)) : dispatch(logout());
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data.message.join(", ") ||
          error.message ||
          "An unknown error occurred"
      );
    }
  };

  useEffect(() => {
    if (!isAuth) {
      checkAuth();
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
