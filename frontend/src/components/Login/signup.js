import React from "react";
import "../style/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginOTPverify from "./loginotpverify";

function Signup() {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [otp, setOTP] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
  };

  const notify = () =>
    toast.success("Email Sent Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      icon: "🚀",
    });

  const notifydanger = (data) =>
    toast.error(data, {
      position: toast.POSITION.TOP_RIGHT,
    });

  const notifywarning = (message) =>
    toast.warn(message, {
      position: toast.POSITION.TOP_RIGHT,
    });

  const submitlogin = () => {
    if (email && password && name && age)
      fetch("http://localhost:8080/signup", {
        method: "post",
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          age: age,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data["message"]) {
            notify();
            setOTP(data);
          } else {
            notifydanger(data["message"]);
          }
        });
  };
  return otp ? (
    <LoginOTPverify otp={otp} />
  ) : (
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
                  <h3 className="text-center fw-bold mx-3 mb-0">Register</h3>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="name"
                    id="username"
                    value={name}
                    required
                    name="name"
                    className="form-control form-control-lg"
                    placeholder="Enter Full Name"
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="user_name"
                    className="form-control form-control-lg"
                    placeholder="Enter Email Address"
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
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    min="1"
                    max="100"
                    onChange={(e) => setAge(e.target.value)}
                    id="age"
                    name="user_ages"
                    className="form-control form-control-lg"
                    placeholder="Enter Age"
                    required
                  ></input>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    onClick={submitlogin}
                    className="btn btn-primary btn-lg w-100"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Register
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    have an account?{" "}
                    <a onClick={() => navigate("/")} className="link-danger">
                      Login
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
}

export default Signup;
