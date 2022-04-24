import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Placeindividual = (props) => {
  const navigate = useNavigate();
  const [review, setIsReview] = useState([]);

  const [isbookmark, setIsbookmark] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [fuelprice, setFuelprice] = useState([]);

  // review
  const [nonreviewcount, setnonreviewcount] = useState(0);
  const [reviewcount, setreviewcount] = useState(0);

  // review modal submit
  const [user_review, setuserreview] = useState("");
  const [user_rating, setuserrating] = useState("");

  // review bootstrap modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // business edit modal
  const [busname, setbusname] = useState("");
  const [busid, setBusid] = useState("");
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

  //business edit modal Modal
  const [lgShow, setLgShow] = useState(false);
  const handlesClose = () => setLgShow(false);

  // toast Notification
  const notifyinsert = (message) =>
    toast.success(message, {
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

  //End of Toast Notification

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
      setnonreviewcount(ncount);
      setreviewcount(count);
      setRatings(ratings);
      setIsReview(data);
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
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
    if (props?.data?.businessDetails?.business_id) {
      reviewget(props?.data?.businessDetails?.business_id);
    }
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
            data = JSON.parse(data);
            if (data.length > 0) {
              data.map((val) => {
                console.log(val.fuel_state);
              });
              setFuelprice(data);
            } else {
              console.log("empty");
              setFuelprice([]);
            }
          });
      };
      Response();
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

  //   function to delete the business data

  //   function to update the business detiails

  const deletebusiness = () => {
    fetch(
      "http://localhost:8080/business/delete/" +
        props?.data?.businessDetails?.business_id,
      {
        method: "delete",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data["message"]) {
          notifydanger(data["message"]);
        }
        if (data) {
          // reviewcalc(data);
          //setBackupdata(data);
          notifyinsert("Details Deleted Successfully !!");
          //props.data = data;
          //setTerm(data);

          console.log(data);
          handlesClose();
          //alert(data);
          //alert(JSON.stringify(data));
        }
      });
  };

  //   function to update the business detiails

  const insertbusiness = () => {
    fetch("http://localhost:8080/business/save", {
      method: "post",
      body: JSON.stringify({
        business_address_id: busid,
        business_address: fulladdress,
        business_state: state,
        business_pincode: pincode,
        businessDetails: {
          business_id: busid,
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
          //setBackupdata(data);
          console.log(data);
          //props.data = data;
          notifyinsert("Data Updated Successfully !!");

          console.log(data);
          handlesClose();
          //alert(data);
          //alert(JSON.stringify(data));
        } else {
          notifydanger(data["message"]);
          // alert(data["message"]);
        }
      });
  };

  // function editdata

  async function editdata() {
    setBusid(props?.data?.businessDetails?.business_address_id);
    setbusname(props?.data?.businessDetails?.business_name);
    setmobile(props?.data?.businessDetails?.business_mobile);
    setemail(props?.data?.businessDetails?.business_mail);
    settiming(props?.data?.businessDetails?.business_timing);
    setcategory(props?.data?.businessDetails?.business_category);
    setFullAddress(props?.data?.business_address);
    setstate(props?.data?.business_state);
    setpincode(props?.data?.business_pincode);
    setdiscription(props?.data?.businessDetails.business_description);
    //alert();
  }

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
                maxlength="100"
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

      {/* Edit User data modal */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit business Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <form>
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
                    <option>Fuelstation</option>
                    <option>Restaurant</option>
                    <option>Hotel</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
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

            <div className="row my-2">
              <div className="col">
                <div className="form-group">
                  <label>Distance</label>
                  <input
                    type="text"
                    className="form-control"
                    id="distance"
                    value={distance}
                    required
                    onChange={(e) => setdistance(e.target.value)}
                    placeholder="Distance from the city (Km)"
                  />
                </div>
              </div>
              <div className="col">
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
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handlesClose}>
            Close
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              insertbusiness();
              handlesClose();
            }}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      {/* // End of modal */}
      <div className="card">
        <div className="card-body position-relative">
          <div className="position-absolute" style={{ right: "15px" }}>
            <button
              type="button"
              onClick={() => {
                editdata();
                setLgShow(true);
              }}
              className="btn btn-primary float-right mx-2"
            >
              <i
                className="fa fa-pencil"
                data-toggle="tooltip"
                data-placement="top"
                title="Tooltip on top"
                aria-hidden="true"
              ></i>
            </button>
            <button
              type="button"
              onClick={deletebusiness}
              className="btn btn-danger float-right"
            >
              <i
                className="fa fa-trash"
                data-toggle="tooltip"
                data-placement="top"
                title="Tooltip on top"
                aria-hidden="true"
              ></i>
            </button>
            {/* {isbookmark ? (
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
              <button
                type="button"
                onClick={toggleBookmark}
                className="btn btn-secondary float-right"
              >
                <i className="fa fa-bookmark-o" aria-hidden="true"></i>
              </button>
            )} */}
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
                <>
                  {reviewcount > 0 ? (
                    <>
                      <div
                        style={{ marginRight: "10px", marginTop: "10px" }}
                        className="card px-2 py-3 border border-primary"
                      >
                        <h6>My Review:</h6>

                        {review.map((e, i) => (
                          <div
                            key={i}
                            className="d-flex align-items-center text-secondary"
                          >
                            {parseInt(localStorage.getItem("loggedin")) ===
                              e.review_user_id && (
                              <>
                                <span className="d-flex align-items-center badge badge-pill bg-primary">
                                  {e.review_rating} ⭐
                                </span>

                                <p className="my-1 mx-2 flex-1">
                                  {e.review_description}
                                </p>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div
                    style={{ marginRight: "10px", marginTop: "10px" }}
                    className="card px-2 py-3 border border-success"
                  >
                    {review.map((e, i) => (
                      <div
                        key={i}
                        className="d-flex align-items-center text-secondary"
                      >
                        {parseInt(localStorage.getItem("loggedin")) !=
                          e.review_user_id && (
                          <>
                            <span className="d-flex align-items-center badge badge-pill bg-primary">
                              {e.review_rating} ⭐
                            </span>

                            <p className="my-1 mx-3 flex-1">
                              {e.review_description}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>{" "}
                </>
              </>
            )}
          </div>{" "}
        </div>
      </div>
      <ToastContainer />
    </>
  ) : (
    <></>
  );
};

export default Placeindividual;
