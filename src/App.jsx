import { useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoutes from "./Layouts/ProtectedRoutes";
import RootLayout from "./Layouts/RootLayout";
import Login from "./components/Login";
import AddProject from "./pages/AddProject";
import HomePage from "./pages/HomePage";
import ModifyProject from "./pages/ModifyProject";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
        />

        <Route path="homepage" element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route index element={<HomePage />} />
          <Route path="addproject" element={<AddProject />} />
          <Route path="modify/:id" element={<ModifyProject />} />
        </Route>
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
