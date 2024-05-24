import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/layout";
import ErrorPage from "../pages/error-page";
import Home from "../pages/home";
import Transactions from "../pages/transactions";
import Categories from "../pages/categories";
import Auth from "../pages/auth";
import ProtectedRoute from "../components/protected-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/transactions",
        element: (
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);
