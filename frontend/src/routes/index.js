import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import App from "../containers/App";
import Bookmark from "../containers/Bookmark";
import SignIn from "../containers/SignIn";
import Signup from "../containers/Signup";
import { getToken } from "../utils";
import { Bookmarks, Home, Login, SignUp } from "./urls";

function PrivateRoute() {
  return getToken() ? <Outlet /> : <Navigate to={Login} />;
}

export default function AllRoutes() {
  return (
    <Routes>
      <Route path={Home} element={<App />} />
      <Route path={Login} element={<SignIn />} />
      <Route path={SignUp} element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path={Bookmarks} element={<Bookmark />} />
      </Route>
    </Routes>
  );
}
