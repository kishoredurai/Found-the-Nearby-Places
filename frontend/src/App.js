import "./App.css";

import Home from "./components/dashboard/home";
import Login from "./components/Login/login";
import LoginOTP from "./components/Login/loginotp";
import LoginOTPverify from "./components/Login/loginotpverify";
import Signup from "./components/Login/signup";
import Details from "./components/details/details";
import Placemanage from "./components/ManageDetails/placemanage";

import Addplace from "./components/ManageDetails/addplace";
import Recentactivity from "./components/recent activity/recentactivity";
import Bookmark from "./components/bookmark/bookmark";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routeList.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

const routeList = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <LoginOTP />,
  },
  {
    path: "/login/otp/verify",
    element: <LoginOTPverify />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/place/details",
    element: <Details />,
  },
  {
    path: "/place/details/add",
    element: <Addplace />,
  },
  {
    path: "/place/details/manage",
    element: <Placemanage />,
  },
  {
    path: "/recent/activity",
    element: <Recentactivity />,
  },
  {
    path: "/bookmark",
    element: <Bookmark />,
  },
];

export default App;
