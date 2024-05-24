import { FC, useState } from "react";
import { AuthService } from "../services/auth.service";
import { IUserData } from "../types/types";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
  const [data, setData] = useState<IUserData>({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (data.email.length && data.password.length) {
        const response = await AuthService.registration(data);
        if (response) {
          toast.success("Account created successfully!");
          setIsLogin(!isLogin);

          return;
        }
      } else {
        throw new Error("Email and Password can't be empty");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data.message.join(", ") ||
          error.message ||
          "An unknown error occurred"
      );
    }
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await AuthService.login(data);

      if (response) {
        setTokenToLocalStorage("token", response.token);
        dispatch(login(response));
        toast.success("You logged in.");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(
        error.message ||
          error?.response?.data.message.join(", ") ||
          "An unknown error occurred"
      );
    }
  };

  return (
    <div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
      <h1 className="text-center text-xl mb-10">
        {isLogin ? "Login" : "Registration"}
      </h1>

      <form
        className="flex w-1/3 flex-col mx-auto gap-5"
        onSubmit={isLogin ? loginHandler : registrationHandler}
      >
        <input
          type="email"
          className="input"
          name="email"
          placeholder="Email"
          onChange={handleInput}
        />
        <input
          type="password"
          className="input"
          name="password"
          placeholder="Password"
          onChange={handleInput}
        />
        <button className="btn btn-green mx-auto">Submit</button>
      </form>

      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button
            className="text-slate-300 hover:text-white"
            onClick={() => setIsLogin(false)}
          >
            Don't have an account yet?
          </button>
        ) : (
          <button
            className="text-slate-300 hover:text-white"
            onClick={() => setIsLogin(true)}
          >
            Already have an account?
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
