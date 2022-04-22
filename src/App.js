import "./App.css";

import Home from "./components/dashboard/home";
import Login from "./components/Login/login";
import LoginOTP from "./components/Login/loginotp";
import LoginOTPverify from "./components/Login/loginotpverify";
import Signup from "./components/Login/signup";
import Placedetails from "./components/dashboard/placedetails";

import Bookmark from "./components/dashboard/bookmark";
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
    path: "/place/user",
    element: <Placedetails />,
  },
  {
    path: "/bookmark",
    element: <Bookmark />,
  },
];

export default App;
