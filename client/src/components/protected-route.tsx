import { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

interface IProtectedRoute {
  children: JSX.Element;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const isAuth = useAuth();

  return isAuth ? (
    children
  ) : (
    <div className="flex flex-col hustify-center items-center mt-20 gap-10">
      <h1 className="text-2xl">You must be logged in to view this page.</h1>
      <img src="/protected.webp" alt="protected" className="w-1/3" />
      <Link to="/auth">
        <button className="btn btn-green">Login</button>
      </Link>
    </div>
  );
};

export default ProtectedRoute;
