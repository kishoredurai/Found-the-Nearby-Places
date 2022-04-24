import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import { Navigate, useNavigate } from "react-router-dom";

const Bookmarkindividual = (props) => {
  const navigate = useNavigate();

  const [isbookmark, setIsbookmark] = useState(true);
  const [review, setIsReview] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [fuelprice, setFuelprice] = useState([]);

  // counting user review

  const [reviewcount, setreviewcount] = useState(0);
  const [nonreviewcount, setnonreviewcount] = useState(0);

  //modal submit
  const [user_review, setuserreview] = useState("");
  const [user_rating, setuserrating] = useState("");

  // bootstrap modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // review submit function
  const routeChange = (page) => {
    navigate(page);
  };

  const submitlogin = (busid) => {
    fetch("http://localhost:8080/review", {
      method: "post",
      body: JSON.stringify({
        review_business_id: busid,
        review_user_id: localStorage.getItem("loggedin"),
        review_rating: user_rating,
        review_description: user_review,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data["message"]) {
          reviewcalc(data);

          // console.log(data);
          //alert(JSON.stringify(data));
        } else {
          alert(data["message"]);
        }
      });
  };

  function reviewcalc(data) {
    if (data.length > 0) {
      let ratings = [0, 0, 0, 0, 0];
      let sum = 0;
      data.forEach((bus) => {
        ratings[bus.review_rating - 1] += 1;
        sum += 1;
      });
      ratings = ratings.map((e) => (e / sum) * 100);
      let count = 0;
      let ncount = 0;
      data.forEach((bus) => {
        if (parseInt(localStorage.getItem("loggedin")) === bus.review_user_id) {
          count++;
        } else {
          ncount++;
        }
      });
      setreviewcount(count);
      setnonreviewcount(ncount);
      setRatings(ratings);
      setIsReview(data);
      setIsbookmark(true);
    } else {
      setRatings([]);
      setIsReview([]);
    }
  }

  // function for the geting the review details based on bus id

  useEffect(() => {
    const reviewget = (busid) => {
      const Response = async () => {
        fetch("http://localhost:8080/review/bus/" + busid, {
          method: "get",
        })
          .then((e) => e.json())
          .then((data) => {
            reviewcalc(data);
            // try {
            //   const response = JSON.parse(data);
            //   if (response.bmid) setIsbookmark(true);
            // } catch (error) {
            //   setIsbookmark(false);
            // }
          });
      };
      Response();
    };
    if (props?.data?.businessDetails?.business_id) {
      reviewget(props?.data?.businessDetails?.business_id);
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [props.data]);

  //function to get the fuel price details based on the category

  useEffect(() => {
    const fueldetails = (category, state) => {
      const Response = async () => {
        fetch("http://localhost:8080/fuelprice", {
          method: "post",
          body: JSON.stringify({
            fuel_category: category,
            fuel_state: state,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((e) => e.text())
          .then((data) => {
            //alert(JSON.stringify(data));
            data = JSON.parse(data);
            if (data.length > 0) {
              data.map((val) => {
                // console.log(val.fuel_state);
              });
              setFuelprice(data);
            } else {
              console.log("empty");
              setFuelprice([]);
            }

            // try {
            //   const response = JSON.parse(data);
            //   if (response.bmid) setIsbookmark(true);
            // } catch (error) {
            //   setIsbookmark(false);
            // }
          });
      };
      Response();
      //alert("cat:" + category + "state: " + state);
    };
    if (props?.data?.businessDetails?.business_category === "Fuelstation") {
      fueldetails(
        props?.data?.businessDetails?.business_category,
        props?.data?.business_state
      );
    } else {
      setFuelprice([]);
    }
  }, [props.data]);

  const toggleBookmark = () => {
    const request = async () => {
      const response = await axios.post(
        "http://localhost:8080/bookmark",
        JSON.stringify({
          bookmark_business_id: props?.data.businessDetails?.business_id,
          bookmark_user_id: localStorage.getItem("loggedin"),
        }),

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setBmreload(true);
      props.datas();

      setIsbookmark(response.data);
    };
    //alert("new" + props?.data.businessDetails?.bus_id);
    request();
  };

  return Object.keys(props?.data).length > 0 ? (
    <>
      {/* Insert Review Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Overall Rating :</label>
              <input
                type="number"
                min="1"
                max="5"
                value={user_rating}
                className="form-control"
                id="rating"
                onChange={(e) => {
                  const num = Number(e.target.value);
                  if (num > 5 || num < 0) {
                    setuserrating(1);
                  } else {
                    setuserrating(e.target.value);
                  }
                }}
                placeholder="Enter Rating from 1-5"
              ></input>
            </div>

            <div className="form-group my-2">
              <label>Add Review :</label>
              <textarea
                className="form-control"
                onChange={(e) => setuserreview(e.target.value)}
                id="review"
                type="text"
                value={user_review}
                placeholder="Enter review max(100)"
                rows="3"
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            variant="secondary"
            className="btn btn-primary"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            variant="primary"
            className="btn btn-success"
            onClick={() => {
              submitlogin(props?.data.businessDetails?.business_id);
              handleClose();
            }}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      <div className="card">
        <div className="card-body position-relative">
          <div className="position-absolute" style={{ right: "15px" }}>
            {isbookmark ? (
              <button
                onClick={toggleBookmark}
                type="button"
                className="btn btn-success float-right"
              >
                <i
                  className="fa fa-bookmark"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Tooltip on top"
                  aria-hidden="true"
                ></i>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={toggleBookmark}
                  className="btn btn-secondary float-right"
                >
                  <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                </button>
              </>
            )}
          </div>
          <table className="table table-borderless">
            <tbody className="borderless">
              <tr>
                <th>Name</th>
                <td>{props?.data.businessDetails?.business_name}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>
                  {" "}
                  <span className="badge bg-primary text-uppercase">
                    {props?.data.businessDetails?.business_category}
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">Contact</th>
                <td>{props?.data.businessDetails?.business_mobile}</td>
              </tr>
              <tr>
                <th>Email ID</th>
                <td>{props?.data.businessDetails?.business_mail}</td>
              </tr>

              <tr>
                <th>Timing</th>
                <td>{props?.data.businessDetails?.business_timing}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{props?.data.business_address}</td>
              </tr>

              <tr>
                <th>State</th>
                <td>{props?.data.business_state}</td>
              </tr>
              <tr>
                <th>About</th>
                <td>{props?.data.businessDetails?.business_description}</td>
              </tr>
            </tbody>
          </table>

          {fuelprice.length === 0 ? (
            <></>
          ) : (
            <>
              <div
                style={{ marginRight: "10px", marginTop: "10px" }}
                className="card px-2 py-3"
              >
                <h6>📈 Fuel Price Statistics:</h6>

                <table className="table table-bordered border-dark">
                  <thead className="border-dark">
                    <tr>
                      <th>Fuel Type</th>
                      <th>Old Price</th>
                      <th>New Price</th>
                      <th>Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fuelprice.map((val, i) => (
                      <tr key={i}>
                        <th className="text-primary">{val.fuel_type}</th>
                        <td>{val.fuel_old_price}</td>
                        <td>{val.fuel_new_price}</td>

                        {val.fuel_old_price - val.fuel_new_price > 0 ? (
                          <td className="text-success ">
                            {"😊 "}
                            {Math.abs(
                              val.fuel_old_price - val.fuel_new_price
                            ).toFixed(2)}
                          </td>
                        ) : (
                          <td className="text-danger">
                            {"😭 "}
                            {Math.abs(
                              val.fuel_old_price - val.fuel_new_price
                            ).toFixed(2)}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div
            style={{ marginRight: "10px", marginTop: "10px" }}
            className="card px-2 py-3"
          >
            <h6>Overall Ratings</h6>
            {ratings.length === 0 ? (
              <p>No Ratings Added!</p>
            ) : (
              <>
                {ratings.map((e, i) => (
                  <div key={i} className="d-flex align-items-center">
                    <span>{i + 1}</span>
                    <div className="progress my-1 mx-2 w-100">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow="0"
                        aria-valuemin="0"
                        style={{ width: e + "%" }}
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div
            style={{ marginRight: "10px", marginTop: "10px" }}
            className="card px-4 py-3"
          >
            <h6 className="d-flex align-items-center">
              Reviews
              <button
                variant="primary"
                onClick={handleShow}
                style={{ marginLeft: "auto" }}
                className="btn btn-outline-success btn-sm float-right"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                🚀 add review
              </button>
            </h6>
            {review.length === 0 ? (
              <p>No Reviews Added!</p>
            ) : (
              <>
                {reviewcount > 0 ? (
                  <>
                    <div
                      style={{ marginRight: "10px", marginTop: "10px" }}
                      className="card px-2 py-3 border border-primary"
                    >
                      <h6>My Reviews:</h6>

                      {review.map((e, i) => (
                        <>
                          {parseInt(localStorage.getItem("loggedin")) ===
                            e.review_user_id && (
                            <div
                              key={i}
                              className="d-flex align-items-center text-secondary"
                            >
                              <span className="d-flex align-items-center badge badge-pill bg-primary">
                                {e.review_rating} ⭐
                              </span>

                              <p className="my-1 mx-2 flex-1">
                                {e.review_description}
                              </p>
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {nonreviewcount > 0 && (
                  <div
                    style={{ marginRight: "10px", marginTop: "10px" }}
                    className="card px-2 py-3 border border-success"
                  >
                    {review.map((e, i) => (
                      <>
                        {parseInt(localStorage.getItem("loggedin")) !=
                          e.review_user_id && (
                          <div
                            key={i}
                            className="d-flex align-items-center text-secondary"
                          >
                            <span className="d-flex align-items-center badge badge-pill bg-primary">
                              {e.review_rating} ⭐
                            </span>

                            <p className="my-1 mx-3 flex-1">
                              {e.review_description}
                            </p>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Bookmarkindividual;
