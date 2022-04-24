import axios from "axios";
import React, { useEffect } from "react";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Placeindividual from "./placeindividual";
import { Navigate, useNavigate } from "react-router-dom";

const Placemanage = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
  };

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

  // used for searching
  const [initialget, setInitialget] = useState(false);
  const [inputValue, setInputValue] = useState("");

  //End of Toast Notification

  const [backup, setBackupdata] = useState([]);
  const navigate = useNavigate();

  const [data, setdata] = useState("");
  const [term, setTerm] = useState([]);
  const [dataset, setdataset] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [individual, stindi] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const [butsearch, setButsearch] = useState(false);

  //Modal
  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => setLgShow(false);

  //modal submit
  const [busname, setbusname] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [timing, settiming] = useState("");
  const [category, setcategory] = useState("");
  const [fulladdress, setFullAddress] = useState("");
  const [city, setcity] = useState("");
  const [district, setdistrict] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [distance, setdistance] = useState("");
  const [discription, setdiscription] = useState("");

  const [dd, setData] = useState([]);

  const [individualIndex, setIndividualindex] = useState(0);
  const [Index, setIndex] = useState({
    start: 0,
    end: 18,
  });

  useEffect(() => {
    // Code to be execute when input changed
    const timeoutId = setTimeout(() => {
      if (inputValue === "" && initialget) {
        console.log(`empty`);
        const Response = async () => {
          const { data } = await axios.get(
            "http://localhost:8080/bookmark/user/" +
              localStorage.getItem("loggedin")
          );
          setTerm(data);
          setBackupdata(data);
        };
        Response();
      } else if (initialget) {
        console.log(
          `I can see you're not typing. I can use "${inputValue}" now!`
        );
        console.log("input " + inputValue);
        const Response = async () => {
          const { data } = await axios.get(
            "http://localhost:8080/business/user/" +
              localStorage.getItem("loggedin") +
              "/search?search=" +
              inputValue
          );
          setTerm(data);
          setBackupdata(data);
        };
        Response();
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  // end of the search function

  // input validation

  function validate() {
    var pat1 = /^\d{6}$/;
    var alerts = true;
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      busname &&
      mobile &&
      email &&
      timing &&
      category &&
      fulladdress &&
      city &&
      district &&
      state &&
      pincode &&
      discription
    ) {
      if (mobile) {
        if (!re.test(mobile)) {
          alerts = false;
          notifydanger("mobile number doest not match the pattern");
        }
      }
      if (pincode) {
        if (!pat1.test(pincode)) {
          alerts = false;

          notifydanger("Pincode doesnt match with pattern");
        }
      }
      if (email) {
        // if (!filter.test(pincode)) {
        //   alerts = false;
        //   alert("email id");
        // }
      }
    } else {
      alerts = false;

      notifywarning("Some input field is empty");
    }

    if (alerts) {
      insertbusiness();
    }
  }

  // modal insert value

  const insertbusiness = () => {
    fetch("http://localhost:8080/business/save", {
      method: "post",
      body: JSON.stringify({
        business_address: fulladdress,
        business_state: state,
        business_pincode: pincode,
        businessDetails: {
          business_name: busname,
          business_mail: email,
          business_mobile: mobile,
          business_category: category,
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
          // reviewcalc(data);
          notifyinsert();
          setBackupdata(data);

          setTerm(data);

          console.log(data);
          handleClose();
          //alert(data);
          //alert(JSON.stringify(data));
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

  // function to refresh when data is changed

  const changeName = () => {
    const Response = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/bookmark/user/" +
          localStorage.getItem("loggedin")
      );
      setBackupdata(data);
      setTerm(data);
    };
    Response();
  };

  // function to get initial data

  useEffect(() => {
    const Response = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/business/user/" +
          localStorage.getItem("loggedin")
      );
      setBackupdata(data);
      setInitialget(true);
      setTerm(data);
    };
    Response();
  }, []);
  const [individualdata, setIndividualdata] = useState({});

  useEffect(() => {
    setdataset(term ? term.slice() : null);
    stindi(term ? term.slice() : null);
  }, [term]);
  let vvv = term;
  let datas = vvv?.slice();

  // search details based on the data

  const searchget = () => {
    // const Response = async () => {
    //   fetch("http://localhost:8080/review/bus/" + busid, {
    //     method: "get",
    //   })
    //     .then((e) => e.json())
    //     .then((data) => {
    //       reviewcalc(data);
    //       // try {
    //       //   const response = JSON.parse(data);
    //       //   if (response.bmid) setIsbookmark(true);
    //       // } catch (error) {
    //       //   setIsbookmark(false);
    //       // }
    //     });
    // };
    // Response();
    alert(data);
  };

  useEffect(() => {
    if (data) {
      let vaa = term;

      datas = vvv
        ? term.filter((x) => {
            if (x.badd_city.match(data)) {
              return x.badd_city;
            }

            return (
              x.businessDetails.business_name.toLowerCase() ===
              data.toLowerCase()
            );
          })
        : null;
      setdataset(datas);
      // setIndividualdata(datas ? datas[0] : null);

      stindi(datas);
    } else {
      setdataset(term ? term.business_state : null);
    }
  }, [data]);

  let mm;
  const search = (y = "") => {
    const ma = individual
      ? individual.filter((x) => {
          return x.businessDetails.business_category === y;
        })
      : null;
    mm = ma;
    setdataset(mm);
  };

  const searchall = () => {
    setdataset(backup);
    console.log(backup);
  };

  useEffect(() => {
    if (toggle) {
      // setIndividualdata(dataset ? dataset[0] : null);
      setToggle(0);
    }
  }, [toggle, dataset, data]);

  const display = dataset
    ? dataset.slice(Index.start, Index.end).map((x, index) => {
        return (
          <div
            onClick={() => {
              setIndividualdata(x);
              setData(x);
            }}
            key={index}
            className="card my-1"
            style={{ width: "100%", cursor: "pointer" }}
          >
            <div className="card-body">
              <h5 className="card-title">{x.businessDetails.business_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {x.business_address}
              </h6>
              <p className="card-text">
                {x.businessDetails.business_description}
              </p>
              <span className="badge bg-primary">{x.business_state}</span>
              <span className="badge bg-success mx-2">
                {x.business_pincode}
              </span>
            </div>
          </div>
        );
      })
    : null;
  useEffect(() => {
    setIndex({
      start: 0,
      end: 18,
    });
    // setIndividualdata(dataset ? dataset[0] : null);
  }, [dataset]);

  const changeIndexHandler = (e) => {
    setIndividualindex(0);

    let operation = e.target.getAttribute("data-operation");
    if (operation === "-")
      if (Index.start > 0) {
        setIndex({
          start: Index.start - 18,
          end: Index.end - 18,
        });
        // setIndividualdata(dataset[Index.start - 18]);
      } else if (Index.end <= dataset.length)
        setIndex({
          start: 0,
          end: 18,
        });
      else
        setIndex({
          start: Index.start,
          end: Index.end,
        });
    else if (Index.end <= dataset.length) {
      setIndex({
        start: Index.start + 18,
        end: Index.end + 18,
      });
      // setIndividualdata(dataset[Index.start + 18]);
    }
  };

  if (!localStorage.getItem("loggedin")) return <Navigate to="/" />;

  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add business Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <form onSubmit={onSubmit}>
            <div className="form-group">
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
                    <option>Select Option</option>
                    <option>Fuelstation</option>
                    <option>Restaurant</option>
                    <option>Hotel</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Website Url</label>
              <input
                type="text"
                className="form-control"
                id="fulladdress"
                required
                value={fulladdress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="Add website URL"
              />
            </div>
            <br></br>
            <div className="form-group">
              <label>Address Details</label>
              <input
                type="text"
                className="form-control"
                id="fulladdress"
                required
                value={fulladdress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="Add Door no / landmark"
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
                  <label>District</label>
                  <input
                    type="text"
                    className="form-control"
                    id="district"
                    value={district}
                    required
                    onChange={(e) => setdistrict(e.target.value)}
                    placeholder="Disctrict"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>State</label>
                  <select
                    className="form-control"
                    id="state"
                    name="state"
                    required
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                  >
                    <option></option>
                    <option>TamilNadu</option>
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleClose}>
            Close
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              //   insertbusiness();
              validate();
            }}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      {/* // End of modal */}
      <div>
        <div className="container-fluid m-0 p-0">
          {/* <nav className="navbar navbar-expand-lg navbar-primary bg-light px-4 ">
          <a className="navbar-brand" href="#">
            <img
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <span className="mx-2">App Name</span>
          </a>
        </nav> */}

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
            <h5>User Added Place Details</h5>
            <div className="form-inline">
              <button
                className="btn btn-outline-primary btn-sm my-2 my-sm-0"
                onClick={() => navigate("/bookmark")}
              >
                <i className="fa fa-bookmark mx-1"></i>My Bookmark
              </button>
              <button
                className="btn btn-outline-secondary btn-sm my-2 mx-2 my-sm-0"
                onClick={() => navigate("/recent/activity")}
              >
                <i className="fa fa-tasks mx-1"></i>Recent Activity
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
              <label htmlFor="searchQuery ">Search</label>
              <input
                id="searchQuery"
                className="form-control mx-2"
                type="text"
                placeholder="Enter location or business name"
                onInput={inputChangeHandler}
              />
            </div>

            <small className="form-text text-muted">Filter by category</small>
            <div className="d-flex pb-2">
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  name="search"
                  id="all"
                  defaultChecked
                  onChange={() => {
                    searchall();
                    setToggle(!toggle);
                  }}
                ></input>
                <label htmlFor="all" className="mx-2">
                  All
                </label>
              </div>

              <div className="d-flex align-items-center">
                <input
                  id="fuel-station"
                  type="radio"
                  name="search"
                  onChange={() => {
                    search("Fuelstation");
                    setToggle(!toggle);
                  }}
                ></input>
                <label htmlFor="fuel-station" className="mx-2">
                  Fuelstation
                </label>
              </div>

              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  name="search"
                  id="restaurant"
                  onChange={() => {
                    search("Restaurant");
                    setToggle(!toggle);
                  }}
                ></input>
                <label htmlFor="restaurant" className="mx-2">
                  Restaurant
                </label>
              </div>

              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  name="search"
                  id="hotel"
                  onChange={() => {
                    search("Hotel");
                    setButsearch(!search);
                    setToggle(!toggle);
                  }}
                ></input>
                <label htmlFor="hotel" className="mx-2">
                  Hotel
                </label>
              </div>
              <div className="form-inline align-right">
                <div
                  className="position-absolute"
                  style={{ right: "15px", bottom: "10px" }}
                >
                  <button
                    className="btn btn-outline-primary btn-sm my-2 my-sm-0 mx-2"
                    onClick={() => navigate("/place/details/add")}
                  >
                    Add Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row p-4">
            <div className="col-sm">
              <div style={{ overflow: "auto" }}>
                {display?.length > 0 ? (
                  display
                ) : (
                  <div class="alert alert-danger text-center" role="alert">
                    <i className="fa fa-exclamation-triangle mx-2"></i> Sorry No
                    Data Available
                  </div>
                )}
              </div>

              <nav className="my-2 " aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    <a
                      data-operation="-"
                      onClick={changeIndexHandler}
                      className="page-link"
                      href="#!"
                    >
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#!">
                      {Index.start}
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#!">
                      -
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#!">
                      {Index.end}
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      data-operation="+"
                      onClick={changeIndexHandler}
                      className="page-link"
                      href="#!"
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-sm">
              <div>
                {individualdata && dataset ? (
                  <Placeindividual
                    datas={changeName}
                    bookmark={bookmark}
                    data={individualdata}
                  />
                ) : (
                  "sorry no data"
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Placemanage;
