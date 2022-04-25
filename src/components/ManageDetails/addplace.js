import axios from "axios";
import React, { useEffect } from "react";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";

const Addplace = () => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  // state field

  const [datas, setDatas] = useState("select");

  const states = ["select", "Assam", "TamilNadu"];

  const districts = [
    {
      states: "TamilNadu",
      Dis: [
        "ariyalur",
        "chengalpet",
        "chennai",
        "coimbatore",
        "cuddalore",
        "dharmapuri",
        "dindigul",
        "erode",
        "kallakurichi",
        "kanniyakumari",
        "karur",
        "krishnagiri",
        "madurai",
        "nagapattinam",
        "namakkal",
        "nilgiris",
        "perambalur",
        "pudukkottai",
        "ramanathapuram",
        "salem",
        "sivaganga",
        "thanjavur",
        "theni",
        "thoothukudi",
        "thiruchirappalli",
        "tirunelveli",
        "tiruppur",
        "tiruvallur",
        "tiruvannamalai",
        "tiruvarur",
        "vellore",
        "viluppuram",
        "virudhunagar",
      ],
    },
    { states: "Assam", Dis: ["MAAAA", "nini", "ndcxk", "dhcnk"] },
    {
      states: "select",
      Dis: ["select"],
    },
  ];

  const displayData = districts.filter((x) => {
    return x.states == datas;
  });

  const changeHandler = (e) => {
    setDatas(e.target.value);
  };

  const display = displayData
    ? displayData[0].Dis.map((x, i) => {
        return (
          <option key={i} value={x}>
            {x}
          </option>
        );
      })
    : null;

  // toast Notification
  const notifyinsert = () =>
    toast.success("Details Inserted Successfully !!", {
      position: toast.POSITION.TOP_RIGHT,
    });

  const notifydanger = (message) =>
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });

  const notifywarning = (message) =>
    toast.warn(message, {
      position: toast.POSITION.TOP_RIGHT,
    });

  // business edit modal
  const [busname, setbusname] = useState("");
  const [busid, setBusid] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [timing, settiming] = useState("");
  const [category, setcategory] = useState("");
  const [fulladdress, setFullAddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [district, setdistrict] = useState("");
  const [Website, setwebsite] = useState("");
  const [discription, setdiscription] = useState("");

  const [dd, setData] = useState([]);

  function validate(input) {
    var pat1 = /^\d{6}$/;
    var alerts = true;
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var temp;
    if (
      busname &&
      mobile &&
      email &&
      timing &&
      category &&
      fulladdress &&
      city &&
      district &&
      Website &&
      state &&
      pincode &&
      discription
    ) {
      if (fulladdress.charAt(fulladdress.length - 1) === ",") {
        alerts = false;
        notifydanger("Address contain special character . remove it");
      } else {
        if (city.includes(",")) {
          alerts = false;
          notifydanger("city contain special character . remove it");
        } else {
          temp = fulladdress;
          temp = temp.concat(" , ", city);
          temp = temp.concat(" , ", district);
          temp = temp.concat(" - ", pincode);
          setFullAddress(temp);
        }
      }
      if (mobile) {
        if (!re.test(mobile)) {
          alerts = false;
          notifydanger("mobile number doest not match the pattern");
        }
      }
      if (category === "Select option") {
        alerts = false;
        notifydanger("Select Category");
      }
      if (pincode) {
        if (!pat1.test(pincode)) {
          alerts = false;
          notifydanger("Pincode doesnt match with pattern");
        }
      }
    } else {
      alerts = false;

      notifywarning("Some input field is empty");
    }

    if (alerts) {
      // alert(fulladdress);
      console.log(fulladdress);
      insertbusiness(input, temp);
    }
  }

  // modal insert value

  const insertbusiness = (out, address) => {
    fetch("http://localhost:8080/business/save", {
      method: "post",
      body: JSON.stringify({
        business_address: address,
        business_state: state,
        business_pincode: pincode,
        businessDetails: {
          business_name: busname,
          business_mail: email,
          business_mobile: mobile,
          business_category: category,
          business_website: Website,
          business_timing: timing,
          business_description: discription,
          business_user_id: localStorage.getItem("loggedin"),
        },
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data["message"]) {
          if (out === 1) {
            notifyinsert();
            navigate("/place/details?id=" + data.business_address_id);
            //alert(data.business_address_id);
          } else {
            notifyinsert();
            reset();
          }
        } else {
          alert(data["message"]);
        }
      });

    // alert(
    //   //   fulladdress +
    //   //     city +
    //   //     district +
    //   //     state +
    //   //     pincode +
    //   //     busname +
    //   //     email +
    //   category
    //   // distance +
    //   // timing +
    //   // discription
    // );
  };
  function reset() {
    setmobile("");
    setbusname("");
    setemail("");
    settiming("");
    setFullAddress("");
    setcategory("");
    setcity("");
    setdiscription("");
    setdistrict("");
    setemail("");
    setmobile("");
    setpincode("");
    setDatas("select");
    setwebsite("");
  }

  if (!localStorage.getItem("loggedin")) return <Navigate to="/" />;

  return (
    <>
      <div>
        <div className="container-fluid m-0 p-0">
          <nav className="navbar navbar-light bg-light justify-content-between navbar-primary bg-light px-4">
            <a className="navbar-brand" onClick={() => navigate("/home")}>
              <img
                src="/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              <span className="mx-2">App Name</span>
            </a>
            <h5></h5>
            <div className="form-inline">
              <button
                className="btn btn-outline-primary btn-sm my-2 my-sm-0"
                onClick={() => navigate("/bookmark")}
              >
                <i className="fa fa-bookmark mx-1"></i>My Bookmark
              </button>
              <button
                className="btn btn-outline-danger btn-sm my-2 my-sm-0 mx-2"
                onClick={() => navigate("/place/details/manage")}
              >
                <i className="fa fa-map-marker mx-1"></i> Manage Place
              </button>
              <button
                className="btn btn-outline-success btn-sm my-2 my-sm-0 "
                type="submit"
                onClick={() => {
                  localStorage.setItem("loggedin", "");
                  navigate("/");
                }}
              >
                <i className="fa fa-sign-out mx-1" aria-hidden="true"></i>Logout
              </button>
            </div>
          </nav>

          <div className="sticky-top bg-light px-4">
            <div className="form-group py-2 d-flex align-items-center">
              {/* <label htmlFor="searchQuery ">Search</label>
              <input
                id="searchQuery"
                className="form-control mx-2"
                type="text"
                placeholder="Enter location or business name"
                onInput={inputChangeHandler}
              /> */}
            </div>
          </div>
          <div className="row p-5">
            <div className="col-sm"></div>

            <div className="col-7">
              <div className="card">
                <div className="card-body position-relative">
                  <h4 className="card-title text-center">Add Place Details</h4>
                  <form className="p-2" id="insertcourse" onSubmit={onSubmit}>
                    <div className="form-group p-1">
                      <label>Business Details:</label>
                      <input
                        type="text"
                        value={busname}
                        className="form-control"
                        required
                        id="busname"
                        onChange={(e) => setbusname(e.target.value)}
                        placeholder="Business Name"
                      />
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group my-2">
                          <label>Mobile Number</label>
                          <input
                            type="number"
                            id="mobile"
                            maxLength="10"
                            value={mobile}
                            required
                            onChange={(e) => setmobile(e.target.value)}
                            className="form-control"
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group my-2">
                          <label>Email</label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            required
                            onChange={(e) => setemail(e.target.value)}
                            className="form-control"
                            placeholder="Email ID"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col">
                        <div className="form-group">
                          <label>Business Timing</label>
                          <input
                            type="text"
                            id="timing"
                            required
                            value={timing}
                            onChange={(e) => settiming(e.target.value)}
                            className="form-control"
                            placeholder="Business Timing"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Business Category</label>
                          <select
                            className="form-control"
                            id="category"
                            required
                            name="category"
                            value={category}
                            onChange={(e) => setcategory(e.target.value)}
                          >
                            <option>Select option</option>

                            <option>Fuelstation</option>
                            <option>Restaurant</option>
                            <option>Hotel</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Website Addresss</label>
                      <input
                        type="text"
                        className="form-control"
                        id="website"
                        required
                        value={Website}
                        onChange={(e) => setwebsite(e.target.value)}
                        placeholder="Website Link"
                      />
                    </div>

                    <div className="form-group pt-2">
                      <label>Address Details</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fulladdress"
                        required
                        value={fulladdress}
                        onChange={(e) => setFullAddress(e.target.value)}
                        placeholder="Full Address"
                      />
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group my-2">
                          <label>City</label>
                          <input
                            type="text"
                            value={city}
                            required
                            id="city"
                            onChange={(e) => setcity(e.target.value)}
                            className="form-control"
                            placeholder="City"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group my-2">
                          <label>State</label>
                          <select
                            className="form-control"
                            id="state"
                            name="state"
                            required
                            onChange={(e) => {
                              changeHandler(e);
                              setstate(e.target.value);
                            }}
                          >
                            {states?.map((x, i) => {
                              return <option key={i}>{x}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label>District</label>
                          <select
                            className="form-control"
                            id="district"
                            required
                            onChange={(e) => setdistrict(e.target.value)}
                            placeholder="Disctrict"
                          >
                            {display}
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Pincode</label>
                          <input
                            type="number"
                            min="1"
                            className="form-control"
                            value={pincode}
                            id="pincode"
                            onChange={(e) => setpincode(e.target.value)}
                            placeholder="Pincode"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="description"
                        id="discription"
                        value={discription}
                        onChange={(e) => setdiscription(e.target.value)}
                        row="3"
                        required
                      ></textarea>
                    </div>
                    <div className="text-center pt-4">
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => navigate("/place/details/manage")}
                      >
                        close
                      </button>
                      <button
                        type="submit"
                        onClick={() => validate(1)}
                        className="btn btn-success mx-2"
                      >
                        save
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary mx-2"
                        onClick={() => validate(2)}
                      >
                        save and add
                      </button>
                    </div>
                  </form>
                </div>
                <ToastContainer />
              </div>
            </div>
            <div className="col-sm"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addplace;
