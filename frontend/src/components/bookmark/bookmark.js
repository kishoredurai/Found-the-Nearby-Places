import axios from "axios";
import React, { useEffect } from "react";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";

import Bookmarkindividual from "./bookmarkindividual";
import { Navigate, useNavigate } from "react-router-dom";

const Bookmark = () => {
  const navigate = useNavigate();

  const [backup, setBackupdata] = useState([]);
  const [data, setdata] = useState("");
  const [term, setTerm] = useState([]);
  const [dataset, setdataset] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [individual, stindi] = useState([]);
  const [butsearch, setButsearch] = useState(false);

  // used for searching
  const [initialget, setInitialget] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
            "http://localhost:8080/business/" +
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

  // function to get the inital data

  useEffect(() => {
    const Response = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/bookmark/user/" +
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
            <h5>My Bookmarks</h5>
            <div className="form-inline">
              <button
                className="btn btn-outline-primary btn-sm my-2 my-sm-0"
                onClick={() => navigate("/recent/activity")}
              >
                <i className="fa fa-tasks mx-1"></i>Recent Activity
              </button>
              <button
                className="btn btn-outline-danger btn-sm my-2 my-sm-0 mx-2"
                onClick={() => navigate("/place/details/manage")}
              >
                <i className="fa fa-map-marker mx-1"></i>Manage Place
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
            </div>
          </div>

          <div className="row p-4">
            <div className="col-sm">
              <div style={{ overflow: "auto" }}>
                {" "}
                {display.length > 0 ? (
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
                  <Bookmarkindividual
                    datas={changeName}
                    data={individualdata}
                  />
                ) : (
                  "sorry no data"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmark;
