import React from "react";
import "../style/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginOTPverify(props) {
  const [otp, setOTP] = useState("");
  let navigate = useNavigate();

  const routeChange = (page) => {
    navigate(page);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log("refresh prevented");
  };

  const notify = (data) =>
    toast.success("Welcome " + data, {
      position: toast.POSITION.TOP_RIGHT,
      icon: "🚀",
    });

  const notifywarning = (message) =>
    toast.warn(message, {
      position: toast.POSITION.TOP_RIGHT,
    });

  const submitlogin = () => {
    fetch("http://localhost:8080/login/otp/verify", {
      method: "post",
      body: JSON.stringify({
        id: props.otp.id,
        otp: otp,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data["message"]) {
          localStorage.setItem("loggedin", data["id"]);
          routeChange("/home");
        } else {
          notifywarning(data["message"]);
        }
      });
  };

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
                  <h3 className="text-center fw-bold mx-3 mb-0">
                    ✔️ One Time Password Verification
                  </h3>
                </div>
                <div className="alert alert-success text-center" role="alert">
                  <i class="fa fa-map-pin"></i>
                  <a href="#" className="alert-link mx-2"></a>Enter the Otp Send
                  to your Mail
                </div>
                <div className="alert alert-warning text-center" role="alert">
                  <i className="fa fa-warning"></i>
                  <a href="#" className="alert-link mx-2"></a>Dont Refresh this
                  Page
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Enter the valid OTP
                  </label>
                  <input
                    onChange={(e) => setOTP(e.target.value)}
                    type="number"
                    value={otp}
                    placeholder="OTP"
                    min="1"
                    max="9999"
                    name="otp"
                    id="otp"
                    required
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    onClick={submitlogin}
                    className="btn btn-success btn-lg w-100"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Verify
                  </button>
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

export default LoginOTPverify;
