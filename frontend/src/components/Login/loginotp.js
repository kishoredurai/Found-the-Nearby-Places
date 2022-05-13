import React from "react";
import "../style/login.css";
import LoginOTPverify from "./loginotpverify";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginOTP() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
  };

  const notify = () =>
    toast.success("Email Sent Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      icon: "🚀",
    });

  const notifydanger = () =>
    toast.error("Entered Email Id is not Valid", {
      position: toast.POSITION.TOP_RIGHT,
    });

  const notifywarning = () =>
    toast.warn("Please Enter the Email ID", {
      position: toast.POSITION.TOP_RIGHT,
    });

  const submitlogin = () => {
    if (!email) {
      notifywarning();

      //alert("Enter Email Address");
    } else {
      //notify();
      fetch("http://localhost:8080/login/otp", {
        method: "post",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data["message"]) {
            //alert(data["message"]);
            notifydanger();
          } else {
            notify();
            setOTP(data);
          }
        });
    }
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
                  <h3 className="text-center fw-bold mx-3 mb-0">
                    One Time Password Login
                  </h3>
                </div>
                <div className="alert alert-danger text-center" role="alert">
                  <i
                    className="fa fa-exclamation-circle mx-3"
                    aria-hidden="true"
                  ></i>
                  Please Enter a Valid Mail id
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email}
                    placeholder="Enter Your username"
                    name="user_name"
                    id="email"
                    required
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    onClick={submitlogin}
                    className="btn btn-primary btn-lg w-100"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Send OTP
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginOTP;
