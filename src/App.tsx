
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Table from "./Table";
import Login from "./Login";
import AuthenticationProvider from "./AuthenticationContext";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Table />,
    },
    {
        path: "/login",
        element: <Login />
    }
  ]);

export default function App() {

    return (
        <AuthenticationProvider>
        <RouterProvider router={router} />
        </AuthenticationProvider>
    )
}