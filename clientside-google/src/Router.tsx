import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { ProductedRouter, PublicRouter } from "./Utils/GlobalFunctions";
import PrivateLayout from "./components/PrivateLayout"; // Import the layout component
import Settings from "./Pages/Settings/Settings";
import Integration from "./Pages/Integration/Integration";
import GoogleSheet from "./Pages/GoogleSheet/GoogleSheet";
import Spreadsheet from "./Pages/Spreadsheet/Spreadsheet";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRouter>
        <Login />
      </PublicRouter>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProductedRouter>
        <PrivateLayout>
          <Dashboard />
        </PrivateLayout>
      </ProductedRouter>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProductedRouter>
        <PrivateLayout>
          <Settings />
        </PrivateLayout>
      </ProductedRouter>
    ),
  },
  {
    path: "/integration",
    element: (
      <ProductedRouter>
        <PrivateLayout>
          <Integration />
        </PrivateLayout>
      </ProductedRouter>
    ),
  },
  {
    path: "/integration/google-sheet",
    element: (
      <ProductedRouter>
        <PrivateLayout>
          <GoogleSheet />
        </PrivateLayout>
      </ProductedRouter>
    ),
  },
  {
    path: `/integration/spreadsheet`,
    element: (
      <ProductedRouter>
        <PrivateLayout>
          <Spreadsheet />
        </PrivateLayout>
      </ProductedRouter>
    ),
  },
]);
