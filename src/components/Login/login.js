import "../style/login.css";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Navigate } from "react-router-dom";

import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import bootstrap from "bootstrap";

const Login = () => {
  let navigate = useNavigate();

  /// block form on submit

  const [status, setStatus] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
  };

  // notification

  const notify = () =>
    toast.success("Email Sent Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      icon: "🚀",
    });

  const notifydanger = () =>
    toast.error("Email Id or Password Field is empty", {
      position: toast.POSITION.TOP_RIGHT,
    });

  const notifywarning = (message) =>
    toast.warn(message, {
      position: toast.POSITION.TOP_RIGHT,
    });

  // end of notification

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // page navigator

  const routeChange = (page) => {
    navigate(page);
  };

  //submit function to send request

  const submitlogin = () => {
    if (status) {
      fetch("http://localhost:8080/login", {
        method: "post",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-type": "application/JSON",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data["message"]) {
            localStorage.setItem("loggedin", data["id"]);
            //localStorage.setItem("loggedname", data["id"]);
            routeChange("/home");
          } else {
            notifywarning(data["message"]);
          }
        });
    }
  };

  if (localStorage.getItem("loggedin")) return <Navigate to="/home" />;

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>

            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={onSubmit}>
                <div className="divider d-flex justify-content-center my-4">
                  <h3 className="text-center fw-bold mx-3 mb-0">Login</h3>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="username"
                    value={email}
                    required
                    name="user_name"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="user_password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    onClick={submitlogin}
                    className="btn btn-primary btn-lg w-100"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>

                  <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="btn btn-outline-danger btn-lg w-100"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Sign in With OTP
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a
                      onClick={() => navigate("/signup")}
                      className="link-danger"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
