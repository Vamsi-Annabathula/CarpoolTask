import React, { useContext, Fragment, useEffect, useState } from "react";
import { UserContext } from "../../Providers/UserProvider";
import {
  fetchOffer,
  fetchOfferRides,
  updateOffer,
  deleteOffer,
} from "../../Services/OfferCalls";
import { OfferContext } from "../../Providers/OfferProvider";
import { RideContext } from "../../Providers/RideProvider";
import { acceptOrRejectRide, requestRide } from "../../Services/RideCalls";
import { useParams, useHistory } from "react-router";
import { Icon } from "office-ui-fabric-react";
import ResponsePopup from "../ResponsePopup/ResponsePopup";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import Loader from "../Loader/Loader";
import "./ViewCard.sass";

const ViewCard = () => {
  const { offerState, offerDispatch }: any = useContext(OfferContext);
  const { rideState, rideDispatch }: any = useContext(RideContext);

  useEffect(() => {}, []);

  return (
    <div className="viewcard-Container">
      {renderPopupsandLoader(rideState, rideDispatch)}
      {renderPopupsandLoader(offerState, offerDispatch)}
      <OfferCardContainer />
    </div>
  );
};

const OfferCardContainer = () => {
  const { offerState, offerDispatch }: any = useContext(OfferContext);
  const { id }: any = useParams();

  useEffect(() => {
    fetchOffer(id, offerDispatch);
  }, []);

  return (
    <Fragment>
      {Object.keys(offerState.offerDetails).length !== 0 && (
        <div className="offercard-Container">
          <div className="offercard-Header">Offer Details</div>
          <BasicCardDetails />
        </div>
      )}
    </Fragment>
  );
};

const renderPopupsandLoader = (offerState: any, offerDispatch: any) => {
  return (
    <Fragment>
      {offerState.displayResponse && (
        <ResponsePopup message={offerState.response} dispatch={offerDispatch} />
      )}
      {offerState.error && (
        <ErrorPopup message={offerState.errorInfo} dispatch={offerDispatch} />
      )}
      {offerState.loader && <Loader />}
    </Fragment>
  );
};

const BasicCardDetails = (props: any) => {
  const { offerState, offerDispatch }: any = useContext(OfferContext);
  const { rideDispatch }: any = useContext(RideContext);
  const { userState }: any = useContext(UserContext);
  const history = useHistory();

  const [localState, setlocalState] = useState({
    sourcePlace: "",
    destPlace: "",
    seatingCount: 0,
    date: "",
    time: "",
    costPerPerson: 0,
    viaPoints: [],
    statusText: "",
  });
  // console.log(localState);

  const [localEditState, setlocalEditState] = useState({
    sourcePlace: false,
    destPlace: false,
    seatingCount: false,
    date: false,
    time: false,
    costPerPerson: false,
    viaPoints: false,
  });

  const InitialTimings = [
    { text: "5am-9am", isSelected: false },
    { text: "9am-12pm", isSelected: false },
    { text: "12pm-3pm", isSelected: false },
    { text: "3pm-6pm", isSelected: false },
    { text: "6pm-9pm", isSelected: false },
    { text: "9pm-5am", isSelected: false },
  ];

  const convertToTimestamp = () => {
    var myDate = localState.date.split("/");
    let time: number;
    if (localState.time.charAt(1) === "p")
      time = parseInt(localState.time.charAt(0)) + 12;
    else if (localState.time.charAt(2) === "p")
      time = parseInt(localState.time.slice(0, 2));
    else time = parseInt(localState.time.charAt(0));
    // console.log(time);
    var newDate =
      myDate[2] +
      "-" +
      ("0" + myDate[1]).slice(-2) +
      "-" +
      ("0" + myDate[0]).slice(-2) +
      "T" +
      ("0" + time).slice(-2) +
      ":00:00";
    return newDate;
  };

  const [timings, setTimings] = useState(InitialTimings);

  const getFormattedTime = (journeyTime: any) => {
    let formattedTime: string;
    let hours: number = new Date(journeyTime).getHours();
    if (hours >= 5 && hours < 9) formattedTime = timings[0].text;
    else if (hours >= 9 && hours < 12) formattedTime = timings[1].text;
    else if (hours >= 12 && hours < 15) formattedTime = timings[2].text;
    else if (hours >= 15 && hours < 18) formattedTime = timings[3].text;
    else if (hours >= 18 && hours < 21) formattedTime = timings[4].text;
    else formattedTime = timings[5].text;
    return formattedTime;
  };

  const getFormattedDate = (journeyTime: any) => {
    let date: Date = new Date(journeyTime);
    let formattedDate: string =
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getUTCFullYear();
    return formattedDate;
  };

  useEffect(() => {
    if (Object.keys(offerState.offerDetails).length !== 0) {
      let state: any = {
        sourcePlace: offerState.offerDetails.sourcePlace,
        destPlace: offerState.offerDetails.destPlace,
        seatingCount: parseInt(offerState.offerDetails.seatingCount),
        date: getFormattedDate(offerState.offerDetails.journeyTime),
        time: getFormattedTime(offerState.offerDetails.journeyTime),
        costPerPerson: parseInt(offerState.offerDetails.costPerPerson),
        viaPoints: offerState.offerDetails.viaPoints,
        statusText: offerState.offerDetails.statusText,
      };
      setlocalState({ ...localState, ...state });
    }
    // console.log(localState);
  }, [offerState.offerDetails]);

  const handleSave = () => {
    let offerDetails: any = { ...offerState.offerDetails, ...localState };
    offerDetails.journeyTime = convertToTimestamp();
    // console.log(offerDetails);
    updateOffer(offerDetails, offerDispatch);
  };

  const handleDelete = () => {
    setdisplayDeleteWarning(true);
  };

  const [displayDeleteWarning, setdisplayDeleteWarning] = useState(false);
  const [displayRequestRidePopup, setdisplayRequestRidePopup] = useState(false);
  const [viapointsEdit, setviapointsEdit] = useState([false, false, false]);

  const handleViapointChange = (event: any, index: number) => {
    let state: any = localState;
    state.viaPoints[index] = event.target.value;
    setlocalState({ ...localState, ...state });
  };

  const handleViapointEdit = (value: boolean, index: number) => {
    let state: any = viapointsEdit;
    state[index] = value;
    setviapointsEdit({ ...viapointsEdit, ...state });
  };

  const handleRequestRide = () => {
    // setdisplayRequestRidePopup(true);
    let rideDetails: any = {
      offerDetails: offerState.offerDetails,
      sourcePlace: offerState.offerDetails.sourcePlace,
      destPlace: offerState.offerDetails.destPlace,
      createdByUser: userState.userInfo,
    };
    // console.log(rideDetails);
    requestRide(rideDetails, rideDispatch);
  };

  const handleOpenBookings = () => {
    let offerDetails: any = { ...offerState.offerDetails, ...localState };
    offerDetails.journeyTime = convertToTimestamp();
    offerDetails.statusText = "Bookings Accepting";
    updateOffer(offerDetails, offerDispatch);
  };

  const handleCloseBookings = () => {
    let offerDetails: any = { ...offerState.offerDetails, ...localState };
    offerDetails.journeyTime = convertToTimestamp();
    offerDetails.statusText = "Bookings Closed";
    updateOffer(offerDetails, offerDispatch);
  };

  const handleActivateOffer = () => {
    let offerDetails: any = { ...offerState.offerDetails, ...localState };
    offerDetails.journeyTime = convertToTimestamp();
    offerDetails.statusText = "Bookings Accepting";
    updateOffer(offerDetails, offerDispatch);
  };

  const handleBack = () => {
    history.push("/bookride");
  };

  const handleButtonSelect = (id: number) => {
    let timingsList: any = InitialTimings;
    timingsList[id].isSelected = true;
    setlocalState({ ...localState, time: timingsList[id].text });
    setTimings(timingsList);
  };
  let isOwner: boolean = false;
  if (Object.keys(offerState.offerDetails).length !== 0) {
    isOwner = offerState.offerDetails.createdByUser.id === userState.userID;
  }

  const getStatusClass = (statusText: string) => {
    if (statusText === "Bookings Accepting") return "bookings-Accepting";
    else if (statusText === "Bookings Closed") return "bookings-Closed";
    else if (statusText === "Deleted") return "deleted";
    else return statusText;
  };

  return (
    <Fragment>
      {/* <div className="requestride-Container">
        <div className=""
      </div> */}
      {/* {Object.keys(offerState.offerDetails).length !== 0 && isOwner && (
        <div className="ride-Timer">
          <Timer />
          <button className="start-Ride">start ride</button>
        </div>
      )} */}
      {displayDeleteWarning ? (
        <div className="deletewarning-Container">
          <div className="deletewarning-Card">
            <div className="deletewarning-Text">Confirm Offer delete</div>
            <div className="deletewarning-Footer">
              <button
                className="delete-Confirm"
                onClick={() => {
                  setdisplayDeleteWarning(false);
                  deleteOffer(offerState.offerDetails.id, offerDispatch);
                }}
              >
                delete
              </button>
              <button
                className="delete-Cancel"
                onClick={() => setdisplayDeleteWarning(false)}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Fragment />
      )}
      <Fragment>
        <div className="basic-Container">
          <div className="basic-Details">
            <div className="container-Header">Ride Info</div>

            <div className="places-Container">
              <div className="from-Container">
                <label className="field-Label">From</label>
                <label className="colon">:</label>
                {localEditState.sourcePlace ? (
                  <Fragment>
                    <input
                      className="from-Text"
                      value={localState.sourcePlace}
                      onChange={(event: any) =>
                        setlocalState({
                          ...localState,
                          sourcePlace: event.target.value,
                        })
                      }
                      onBlur={() =>
                        setlocalEditState({
                          ...localEditState,
                          sourcePlace: false,
                        })
                      }
                    />
                    <button
                      className="editicon-Button"
                      onClick={() =>
                        setlocalEditState({
                          ...localEditState,
                          sourcePlace: false,
                        })
                      }
                    >
                      <Icon iconName="Save" className="edit" />
                    </button>
                  </Fragment>
                ) : (
                  <div className="from-Text">{localState.sourcePlace}</div>
                )}
              </div>
              <div className="to-Container">
                <label className="field-Label">To</label>
                <label className="colon">:</label>
                {localEditState.destPlace ? (
                  <Fragment>
                    <input
                      className="to-Text"
                      value={localState.destPlace}
                      onChange={(event: any) =>
                        setlocalState({
                          ...localState,
                          destPlace: event.target.value,
                        })
                      }
                      onBlur={() =>
                        setlocalEditState({
                          ...localEditState,
                          destPlace: false,
                        })
                      }
                    />
                    <button
                      className="editicon-Button"
                      onClick={() =>
                        setlocalEditState({
                          ...localEditState,
                          destPlace: false,
                        })
                      }
                    >
                      <Icon iconName="Save" className="edit" />
                    </button>
                  </Fragment>
                ) : (
                  <div className="to-Text">{localState.destPlace}</div>
                )}
              </div>
            </div>
            <div className="dateTime-Container">
              <div className="date-Container">
                <label className="field-Label">Date</label>
                <label className="colon">:</label>
                {localEditState.date ? (
                  <Fragment>
                    <input
                      className="date-Text"
                      value={localState.date}
                      onChange={(event: any) =>
                        setlocalState({
                          ...localState,
                          date: event.target.value,
                        })
                      }
                      onBlur={() =>
                        setlocalEditState({ ...localEditState, date: false })
                      }
                    />
                    <button
                      className="editicon-Button"
                      onClick={() =>
                        setlocalEditState({
                          ...localEditState,
                          date: false,
                        })
                      }
                    >
                      <Icon iconName="Save" className="edit" />
                    </button>
                  </Fragment>
                ) : (
                  <div className="date-Text">{localState.date}</div>
                )}
              </div>
              <div className="time-Container">
                <label className="field-Label">Time</label>
                <label className="colon">:</label>
                {localEditState.time && (
                  <div className="time-Popup">
                    <div className="edittime-Container">
                      <div className="timepopup-Header">
                        <div className="popupheader">Edit Time</div>
                        <Icon
                          iconName="ChromeClose"
                          onClick={() =>
                            setlocalEditState({
                              ...localEditState,
                              time: false,
                            })
                          }
                        />
                      </div>
                      <div className="timings-Group">
                        {timings.map((time, index) => (
                          <button
                            key={index}
                            className={
                              time.isSelected
                                ? "time-Button selected"
                                : "time-Button"
                            }
                            onClick={() => handleButtonSelect(index)}
                          >
                            {time.text}
                          </button>
                        ))}
                      </div>
                      <button
                        className="ok-Button"
                        onClick={() =>
                          setlocalEditState({
                            ...localEditState,
                            time: false,
                          })
                        }
                      >
                        ok
                      </button>
                    </div>
                  </div>
                )}
                <div className="time-Text">{localState.time}</div>
              </div>
            </div>
            <div className="costAvailability-Container">
              <div className="cost-Container">
                <label className="field-Label">Price</label>
                <label className="colon">:</label>
                {localEditState.costPerPerson ? (
                  <Fragment>
                    <input
                      className="cost-Text"
                      type="number"
                      value={localState.costPerPerson}
                      onChange={(event: any) =>
                        setlocalState({
                          ...localState,
                          costPerPerson: parseInt(event.target.value),
                        })
                      }
                      onBlur={() =>
                        setlocalEditState({
                          ...localEditState,
                          costPerPerson: false,
                        })
                      }
                    />
                    <button
                      className="editicon-Button"
                      onClick={() =>
                        setlocalEditState({
                          ...localEditState,
                          costPerPerson: false,
                        })
                      }
                    >
                      <Icon iconName="Save" className="edit" />
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="cost-Text">
                      Rs.{localState.costPerPerson}
                    </div>
                    {isOwner && (
                      <button
                        className="editicon-Button"
                        onClick={() =>
                          setlocalEditState({
                            ...localEditState,
                            costPerPerson: true,
                          })
                        }
                      >
                        <Icon iconName="Edit" className="edit" />
                      </button>
                    )}
                  </Fragment>
                )}
              </div>
              <div className="availability-Container">
                <label className="field-Label">Seat Availability</label>
                <label className="colon">:</label>
                {localEditState.seatingCount ? (
                  <Fragment>
                    <input
                      type="number"
                      className="availability-Text"
                      value={localState.seatingCount}
                      onChange={(event: any) =>
                        setlocalState({
                          ...localState,
                          seatingCount: parseInt(event.target.value),
                        })
                      }
                      onBlur={() =>
                        setlocalEditState({
                          ...localEditState,
                          seatingCount: false,
                        })
                      }
                    />
                    <button
                      className="editicon-Button"
                      onClick={() =>
                        setlocalEditState({
                          ...localEditState,
                          seatingCount: false,
                        })
                      }
                    >
                      <Icon iconName="Save" className="edit" />
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="availability-Text">
                      {("0" + localState.seatingCount).slice(-2)}
                    </div>
                    {isOwner && (
                      <button
                        className="editicon-Button"
                        onClick={() =>
                          setlocalEditState({
                            ...localEditState,
                            seatingCount: true,
                          })
                        }
                      >
                        <Icon iconName="Edit" className="edit" />
                      </button>
                    )}
                  </Fragment>
                )}
              </div>
            </div>
            {localState.viaPoints.length !== 0 && (
              <div className="viapoints-Container">
                {[0, 1, 2].map((index: number) => (
                  <div key={index} className="viapoint">
                    <label className="field-Label">
                      {"Viapoint " + (index + 1)}
                    </label>
                    <label className="colon">:</label>
                    {viapointsEdit[index] ? (
                      <Fragment>
                        <input
                          className="viapoint-Text"
                          value={localState.viaPoints[index]}
                          onChange={(event: any) =>
                            handleViapointChange(event, index)
                          }
                          onBlur={() => handleViapointEdit(false, index)}
                        />
                        <button
                          className="editicon-Button"
                          onClick={() => handleViapointEdit(false, index)}
                        >
                          <Icon iconName="Save" className="edit" />
                        </button>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className="viapoint-Text">
                          {localState.viaPoints[index]}
                        </div>
                        {isOwner && (
                          <button
                            className="editicon-Button"
                            onClick={() => handleViapointEdit(true, index)}
                          >
                            <Icon iconName="Edit" className="edit" />
                          </button>
                        )}
                      </Fragment>
                    )}
                  </div>
                ))}
                <div className="status-Container">
                  <div
                    className={
                      "status-Text " + getStatusClass(localState.statusText)
                    }
                  >
                    {localState.statusText}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {offerState.offerDetails.createdByUser.id === userState.userID
          ? renderOwnerPart(
              offerState,
              handleSave,
              handleCloseBookings,
              handleOpenBookings,
              handleActivateOffer,
              handleDelete
            )
          : renderUserPart(
              offerState,
              userState,
              handleRequestRide,
              handleBack
            )}
      </Fragment>
    </Fragment>
  );
};

const renderOwnerPart = (
  offer: any,
  handleSave: any,
  handleCloseBookings: any,
  handleOpenBookings: any,
  handleActivateOffer: any,
  handleDelete: any
) => {
  return (
    <Fragment>
      {offer.offerDetails.statusText !== "Deleted" &&
        renderRideRequests(offer.offerRides)}
      <div className="ownerpart-Footer">
        <button className="save-Button" onClick={handleSave}>
          save
        </button>
        {offer.offerDetails.statusText === "Deleted" && (
          <button
            className="activateoffer-Button"
            onClick={handleActivateOffer}
          >
            activate offer
          </button>
        )}
        {offer.offerDetails.statusText === "Bookings Accepting" && (
          <button className="closebooking-Button" onClick={handleCloseBookings}>
            close bookings
          </button>
        )}
        {offer.offerDetails.statusText === "Bookings Closed" &&
          parseInt(offer.offerDetails.seatingCount) !== 0 && (
            <button className="openbooking-Button" onClick={handleOpenBookings}>
              open bookings
            </button>
          )}
        {offer.offerDetails.statusText !== "Deleted" && (
          <button className="deleteoffer-Button" onClick={handleDelete}>
            delete offer
          </button>
        )}
      </div>
    </Fragment>
  );
};

const renderRideRequests = (offerRides: any) => {
  debugger;
  return (
    <div className="riderequests-Container">
      <div className="riderequests-Header">Ride Requests</div>
      <div className="riderequests">
        {offerRides.length !== 0 ? (
          offerRides.map((ride: any) => (
            <RideInfo rideDetails={ride} key={ride.id} />
          ))
        ) : (
          <div className="nooffer-Rides">No ride requests</div>
        )}
      </div>
    </div>
  );
};

const RideInfo = (props: any) => {
  const [showWarning, setshowWarning] = useState({
    acceptride: false,
    rejectride: false,
  });

  const { offerState, offerDispatch }: any = useContext(OfferContext);
  const { rideDispatch }: any = useContext(RideContext);

  return (
    <div className="rideinfo-Container">
      {showWarning.acceptride && (
        <div className="warning-Container">
          <div className="warning-Card">
            <div className="warning-Text">Confirm request</div>
            <div className="warning-Footer">
              <button
                className="confirm"
                onClick={() => {
                  setshowWarning({ ...showWarning, acceptride: false });
                  let ride: any = props.rideDetails;
                  ride.offerDetails = offerState.offerDetails;
                  ride.statusText = "RideAccepted";
                  // console.log(ride);
                  acceptOrRejectRide(ride, rideDispatch, offerDispatch);
                }}
              >
                accept ride
              </button>
              <button
                className="cancel"
                onClick={() =>
                  setshowWarning({ ...showWarning, acceptride: false })
                }
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showWarning.rejectride && (
        <div className="warning-Container">
          <div className="warning-Card">
            <div className="warning-Text">Confirm Ride Reject</div>
            <div className="warning-Footer">
              <button
                className="confirm"
                onClick={() => {
                  setshowWarning({ ...showWarning, rejectride: false });
                  let ride: any = props.rideDetails;
                  ride.statusText = "RequestRejected";
                  console.log(ride);
                  acceptOrRejectRide(ride, rideDispatch,offerDispatch);
                }}
              >
                reject ride
              </button>
              <button
                className="cancel"
                onClick={() =>
                  setshowWarning({ ...showWarning, rejectride: false })
                }
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="rideinfocontainer-Body">
        <div className="boardingpoint-Container">
          <div className="field-Label">Boarding Point</div>
          <label className="colon">:</label>
          <div className="field-Value">{props.rideDetails.sourcePlace}</div>
        </div>
        <div className="destinationpoint-Container">
          <div className="field-Label">Destination Point</div>
          <label className="colon">:</label>
          <div className="field-Value">{props.rideDetails.destPlace}</div>
        </div>
        <div className="name-Container">
          <div className="field-Label">Passenger Name</div>
          <label className="colon">:</label>
          <div className="field-Value">
            {props.rideDetails.createdByUser.name}
          </div>
        </div>
        <div className="phone-Container">
          <div className="field-Label">Phone No</div>
          <label className="colon">:</label>
          <div className="field-Value">
            {props.rideDetails.createdByUser.phone === ""
              ? props.rideDetails.createdByUser.phone
              : "-"}
          </div>
        </div>
      </div>
      {props.rideDetails.statusText === "Request Sent" ? (
        <div className="ridecontainer-Footer">
          <button
            className="accept-Button"
            onClick={() => setshowWarning({ ...showWarning, acceptride: true })}
          >
            accept
          </button>
          <button
            className="reject-Button"
            onClick={() => setshowWarning({ ...showWarning, rejectride: true })}
          >
            reject
          </button>
        </div>
      ) : (
        <div className="ridecontainer-Status">
          <div className={getStatusClass(props.rideDetails.statusText)}>
            {props.rideDetails.statusText}
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusClass = (status: string) => {
  if (status === "Ride Accepted") return "ride-Accepted";
  else if (status === "Request Rejected") return "request-Rejected";
  else if (status === "Ride Cancelled") return "ride-Cancelled";
  else return status;
};

const checkRideRequested = (offerRides: Array<any>, userID: number) => {
  for (var i = 0; i < offerRides.length; i++) {
    if (offerRides[i].createdByUser.id === userID) return true;
  }
  return false;
};

const renderUserPart = (
  offerState: any,
  userState: any,
  handleRequestRide: any,
  handleBack: any
) => {
  // debugger;

  return (
    <Fragment>
      <div className="userpart-Body">
        <div className="vehicleinfo-Container">
          <div className="container-Header">Vehicle Info</div>
          <div className="vehicle-Container">
            <div className="vehicle-Name">
              <div className="field-Label">Vehicle Name</div>
              <label className="colon">:</label>
              <div className="field-Value">
                {offerState.offerDetails.vehicleDetails.name}
              </div>
            </div>
            <div className="vehicle-No">
              <div className="field-Label">Vehicle No</div>
              <label className="colon">:</label>
              <div className="field-Value">
                {offerState.offerDetails.vehicleDetails.vehicleNo}
              </div>
            </div>
          </div>
        </div>
        <div className="ownerinfo-Container">
          <div className="container-Header">OwnerInfo</div>
          <div className="ownercontainer-Details">
            <div className="owner-Name">
              <div className="field-Label">Name</div>
              <label className="colon">:</label>
              <div className="field-Value">
                {offerState.offerDetails.createdByUser.name}
              </div>
            </div>
            <div className="owner-Phone">
              <div className="field-Label">Phone No</div>
              <label className="colon">:</label>
              <div className="field-Value">
                {offerState.offerDetails.createdByUser.phone}
              </div>
            </div>
            {/* <div className="owner-Email">
            <div className="field-Label">Email</div>
            <label className="colon">:</label>
            <div className="field-Value">{offerState.offerDetails.createdByUser.email}</div>
          </div> */}
          </div>
        </div>
      </div>
      <div className="userpart-Footer">
        <button className="search-Nav" onClick={handleBack}>
          back to search
        </button>
        {userState.isAuthenticated && (
          <Fragment>
            {checkRideRequested(offerState.offerRides, userState.userID) ? (
              <Fragment />
            ) : (
              <button
                className="request-Ride"
                onClick={() => handleRequestRide(offerState.offerDetails.id)}
              >
                request ride
              </button>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

const Timer = () => {
  return <div>timer</div>;
  // const calculateTimeLeft = () => {
  //   const difference = +Date.now - +new Date();
  //   let timeLeft = {};

  //   if (difference > 0) {
  //     timeLeft = {
  //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //       minutes: Math.floor((difference / 1000 / 60) % 60),
  //       seconds: Math.floor((difference / 1000) % 60)
  //     };
  //   }

  //   return timeLeft;
  // };

  // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // useEffect(() => {
  //   setTimeout(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);
  // });

  // const timerComponents:any = [];

  // Object.keys(timeLeft).forEach((interval:any) => {
  //   if (!timeLeft[interval]) {
  //     return;
  //   }

  //   timerComponents.push(
  //     <span>
  //       {timeLeft[interval]} {interval}{" "}
  //     </span>
  //   );
  // });

  // return (
  //   <div>
  //     {timerComponents.length ? timerComponents : <span>Time's up!</span>}
  //   </div>
  // );
};

export default ViewCard;
