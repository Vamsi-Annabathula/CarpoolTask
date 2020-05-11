import React, { Fragment, useState, useContext } from "react";
import { Card } from "@uifabric/react-cards";
import { Toggle, Icon } from "office-ui-fabric-react";
import { useHistory } from "react-router";
import { UserContext } from "../../Providers/UserProvider";
import { createOffer } from "../../Services/OfferCalls";
import { OfferContext } from "../../Providers/OfferProvider";
import backgroundImage from "../../Images/applicationbg.png";
import ResponsePopup from "../ResponsePopup/ResponsePopup";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import Loader from "../Loader/Loader";
import "./OfferRide.sass";

enum Fields {
  Source,
  Destination,
  Date,
  Stop1,
  Stop2,
  Stop3,
  Price,
  Time,
  Seat,
}

const OfferRide = () => {
  debugger;
  let { userState, userDispatch }: any = useContext(UserContext);

  const history = useHistory();

  const activateField = (field: Fields) => {
    if (field === Fields.Source)
      setFieldActive({ ...fieldActive, source: true });
    else if (field === Fields.Destination)
      setFieldActive({ ...fieldActive, destination: true });
    else if (field === Fields.Date)
      setFieldActive({ ...fieldActive, showDateFormat: true, date: true });
    else if (field === Fields.Stop1)
      setFieldActive({ ...fieldActive, stop1: true });
    else if (field === Fields.Stop2)
      setFieldActive({ ...fieldActive, stop2: true });
    else if (field === Fields.Stop3)
      setFieldActive({ ...fieldActive, stop3: true });
    else setFieldActive({ ...fieldActive, price: true });
  };

  const disableField = (event: any, field: Fields) => {
    if (event.target.value === "") {
      if (field === Fields.Source)
        setFieldActive({ ...fieldActive, source: false });
      else if (field === Fields.Destination)
        setFieldActive({ ...fieldActive, destination: false });
      else if (field === Fields.Date)
        setFieldActive({ ...fieldActive, showDateFormat: false, date: false });
      else if (field === Fields.Stop1)
        setFieldActive({ ...fieldActive, stop1: false });
      else if (field === Fields.Stop2)
        setFieldActive({ ...fieldActive, stop2: false });
      else if (field === Fields.Stop3)
        setFieldActive({ ...fieldActive, stop3: false });
      else setFieldActive({ ...fieldActive, price: false });
    }
  };
  const [timeDateState, settimeDateState] = useState({
    time: "",
    date: "",
  });

  const convertToTimestamp = () => {
    var myDate = timeDateState.date.split("/");
    var newDate =
      myDate[2] +
      "-" +
      ("0" + myDate[1]).slice(-2) +
      "-" +
      ("0" + myDate[0]).slice(-2) +
      "T" +
      ("0" + timeDateState.time.charAt(0)).slice(-2) +
      ":00:00";
    return newDate;
  };

  const handleButtonSelect = (id: number, field: Fields) => {
    if (field === Fields.Time) {
      let timingsList: any = initialTimings;
      timingsList[id].isSelected = true;
      settimeDateState({ ...timeDateState, time: timingsList[id].text });
      setTimings(timingsList);
    } else {
      let seats: any = noOfSeats;
      seats[id].isSelected = true;
      setLocalState({ ...localState, seatingCount: seats[id].text });
      setSeats(seats);
    }
  };

  const handleChange = (event: any, field: Fields) => {
    //places api call based on the event.target.value and add to places
    setFieldActive({ ...fieldActive, placesDropDown: true });
    if (field === Fields.Source)
      setLocalState({ ...localState, sourcePlace: event.target.value });
    else if (field === Fields.Destination)
      setLocalState({ ...localState, destPlace: event.target.value });
    else {
      let local: any = localState;
      if (field === Fields.Stop1) local.viaPoints[0] = event.target.value;
      else if (field === Fields.Stop2) local.viaPoints[1] = event.target.value;
      else if (field === Fields.Stop3) local.viaPoints[2] = event.target.value;
      setLocalState({ ...localState, ...local });
    }
  };

  const initialTimings = [
    { text: "5am-9am", isSelected: false },
    { text: "9am-12pm", isSelected: false },
    { text: "12pm-3pm", isSelected: false },
    { text: "3pm-6pm", isSelected: false },
    { text: "6pm-9pm", isSelected: false },
    { text: "9pm-5am", isSelected: false },
  ];

  const noOfSeats = [
    { text: 1, isSelected: false },
    { text: 2, isSelected: false },
    { text: 3, isSelected: false },
  ];

  const [places] = useState([]);

  const [timings, setTimings] = useState(initialTimings);

  const [seats, setSeats] = useState(noOfSeats);

  const [fieldActive, setFieldActive] = useState({
    source: false,
    destination: false,
    showDateFormat: false,
    placesDropDown: false,
    date: false,
    stop1: false,
    stop2: false,
    stop3: false,
    price: false,
  });

  const [localState, setLocalState] = useState({
    sourcePlace: "",
    destPlace: "",
    journeyTime: "",
    viaPoints: ["", "", ""],
    costPerPerson: 0,
    seatingCount: 0,
  });

  const [viewPage1, setviewPage1] = useState(true);

  function renderRideDetailsPage1() {
    return (
      <Fragment>
        <Card.Item className="search-Box">
          <div className="source">
            <label className={fieldActive.source ? "field-active" : ""}>
              From
            </label>
            <input
              className="floating-Label"
              type="text"
              value={localState.sourcePlace}
              onFocus={() => activateField(Fields.Source)}
              onBlur={(event: any) => disableField(event, Fields.Source)}
              onChange={(event: any) => handleChange(event, Fields.Source)}
            />
            {fieldActive.placesDropDown &&
            fieldActive.source &&
            places.length !== 0 ? (
              <div className="place-Search">
                {places.map((place, index) => (
                  <div
                    key={index}
                    className="place"
                    onClick={() => {
                      setFieldActive({ ...fieldActive, source: true });
                      setLocalState({ ...localState, sourcePlace: place });
                    }}
                  >
                    {place}
                  </div>
                ))}
              </div>
            ) : (
              <Fragment />
            )}
          </div>
          <div className="destination">
            <label className={fieldActive.destination ? "field-active" : ""}>
              To
            </label>
            <input
              className="floating-Label"
              type="text"
              value={localState.destPlace}
              onFocus={() => activateField(Fields.Destination)}
              onBlur={(event: any) => disableField(event, Fields.Destination)}
              onChange={(event: any) => handleChange(event, Fields.Destination)}
            />
            {fieldActive.placesDropDown &&
            fieldActive.destination &&
            places.length !== 0 ? (
              <div className="place-Search">
                {places.map((place, index) => (
                  <div
                    key={index}
                    className="place"
                    onClick={() => {
                      setFieldActive({ ...fieldActive, destination: true });
                      setLocalState({ ...localState, destPlace: place });
                    }}
                  >
                    {place}
                  </div>
                ))}
              </div>
            ) : (
              <Fragment />
            )}
          </div>
          <div className="search-Design">
            <Icon className="source-Icon" iconName="LocationFill" />
            <Icon iconName="LocationDot" />
            <Icon iconName="LocationDot" />
            <Icon iconName="LocationDot" />
            <Icon iconName="LocationDot" />
            <Icon className="destination-Icon" iconName="Location" />
          </div>
          <div className="date">
            <label className={fieldActive.date ? "field-active" : ""}>
              Date
            </label>
            <input
              className="floating-Label"
              type="text"
              placeholder={fieldActive.showDateFormat ? "dd/mm/yyyy" : ""}
              value={timeDateState.date}
              onFocus={() => activateField(Fields.Date)}
              onBlur={(event: any) => disableField(event, Fields.Date)}
              onChange={(event: any) =>
                settimeDateState({ ...timeDateState, date: event.target.value })
              }
            />
          </div>
          <div className="time">
            <label>Time</label>
            <div className="timings-Group">
              {timings.map((time, index) => (
                <button
                  key={index}
                  className={
                    time.isSelected ? "time-Button selected" : "time-Button"
                  }
                  onClick={() => handleButtonSelect(index, Fields.Time)}
                >
                  {time.text}
                </button>
              ))}
            </div>
          </div>
        </Card.Item>
        <div className="card-Footer">
          <button onClick={() => setviewPage1(false)} className="next">
            Next>>
          </button>
        </div>
      </Fragment>
    );
  }

  function renderRideDetailsPage2() {
    return (
      <Fragment>
        <Card.Item className="search-Box">
          <div className="stop1">
            <label className={fieldActive.stop1 ? "field-active" : ""}>
              Stop 1
            </label>
            <input
              className="floating-Label"
              type="text"
              value={localState.viaPoints[0]}
              onFocus={() => activateField(Fields.Stop1)}
              onBlur={(event: any) => disableField(event, Fields.Stop1)}
              onChange={(event: any) => handleChange(event, Fields.Stop1)}
            />
            {fieldActive.placesDropDown &&
            fieldActive.stop1 &&
            places.length !== 0 ? (
              <div className="place-Search">
                {places.map((place, index) => (
                  <div
                    key={index}
                    className="place"
                    onClick={() => {
                      setFieldActive({ ...fieldActive, stop1: true });
                      let local: any = localState;
                      local.viaPoints[0] = place;
                      setLocalState({ ...localState, ...local });
                    }}
                  >
                    {place}
                  </div>
                ))}
              </div>
            ) : (
              <Fragment />
            )}
          </div>

          <div className="stop2">
            <label className={fieldActive.stop2 ? "field-active" : ""}>
              Stop 2
            </label>
            <input
              className="floating-Label"
              type="text"
              value={localState.viaPoints[1]}
              onFocus={() => activateField(Fields.Stop2)}
              onBlur={(event: any) => disableField(event, Fields.Stop2)}
              onChange={(event: any) => handleChange(event, Fields.Stop2)}
            />
            {fieldActive.placesDropDown &&
            fieldActive.stop2 &&
            places.length !== 0 ? (
              <div className="place-Search">
                {places.map((place, index) => (
                  <div
                    key={index}
                    className="place"
                    onClick={() => {
                      setFieldActive({ ...fieldActive, stop2: true });
                      let local: any = localState;
                      local.viaPoints[1] = place;
                      setLocalState({ ...localState, ...local });
                    }}
                  >
                    {place}
                  </div>
                ))}
              </div>
            ) : (
              <Fragment />
            )}
          </div>

          <div className="stop3">
            <label className={fieldActive.stop3 ? "field-active" : ""}>
              Stop 3
            </label>
            <input
              className="floating-Label"
              type="text"
              value={localState.viaPoints[2]}
              onFocus={() => activateField(Fields.Stop3)}
              onBlur={(event: any) => disableField(event, Fields.Stop3)}
              onChange={(event: any) => handleChange(event, Fields.Stop3)}
            />
            {fieldActive.placesDropDown &&
            fieldActive.stop3 &&
            places.length !== 0 ? (
              <div className="place-Search">
                {places.map((place, index) => (
                  <div
                    key={index}
                    className="place"
                    onClick={() => {
                      setFieldActive({ ...fieldActive, stop3: true });
                      let local: any = localState;
                      local.viaPoints[2] = place;
                      setLocalState({ ...localState, ...local });
                    }}
                  >
                    {place}
                  </div>
                ))}
              </div>
            ) : (
              <Fragment />
            )}
          </div>

          <div className="search-Design2">
            <Icon className="source-Icon" iconName="LocationFill" />
            <Icon iconName="LocationDot" />
            <Icon iconName="LocationDot" />
            <Icon iconName="LocationDot" />
            <Icon iconName="LocationDot" />
            <Icon iconName="LocationDot" />
            <Icon iconName="LocationDot" />
            <Icon iconName="LocationDot" />
            <Icon className="destination-Icon" iconName="Location" />
          </div>

          <div className="seatsandCost-Container">
            <div className="seats-Container">
              <label className="seats-Text">Seats</label>
              <div className="seatselection-Buttons">
                {seats.map((seat: any, index: number) => (
                  <button
                    key={index}
                    className={seat.isSelected ? "seat selected" : "seat"}
                    onClick={() => handleButtonSelect(index, Fields.Seat)}
                  >
                    {seat.text}
                  </button>
                ))}
              </div>
            </div>
            <div className="price-Container">
              <label className={fieldActive.price ? "field-active" : ""}>
                Price
              </label>
              <input
                className="floating-Label"
                type="text"
                onFocus={() => activateField(Fields.Price)}
                onBlur={(event: any) => disableField(event, Fields.Price)}
                value={localState.costPerPerson ? localState.costPerPerson : ""}
                onChange={(event: any) =>
                  setLocalState({
                    ...localState,
                    costPerPerson: parseInt(event.target.value),
                  })
                }
              />
            </div>
          </div>
        </Card.Item>
        <div className="card-Footer">
          <button className="back-Button" onClick={() => setviewPage1(true)}>
            back
          </button>
          <button
            onClick={() => {
              // setviewPage1(true);
              // console.log(localState);
              let offerDetails: any = localState;
              offerDetails.journeyTime = convertToTimestamp();
              offerDetails.vehicleDetails = userState.userInfo.vehicles[0];
              offerDetails.createdByUser = userState.userInfo;
              console.log(offerDetails);
              createOffer(offerDetails, userDispatch);
            }}
            className="submit"
          >
            Submit
          </button>
        </div>
      </Fragment>
    );
  }

  const renderLoaderAndPopups = (userState: any, userDispatch: any) => {
    return (
      <Fragment>
        {userState.displayResponse && (
          <ResponsePopup message={userState.response} dispatch={userDispatch} />
        )}
        {userState.error && (
          <ErrorPopup message={userState.errorInfo} dispatch={userDispatch} />
        )}
        {userState.loader && <Loader />}
      </Fragment>
    );
  };
  debugger;
  return (
    <Fragment>
      {userState.isAuthenticated ? (
        <div className="offer-Ride">
          {renderLoaderAndPopups(userState, userDispatch)}
          <img
            className="ms-hiddenMdDown offerRide-Background"
            src={backgroundImage}
            alt="offerRide-background"
          />
          {(userState.userInfo.vehicles !== undefined &&
            userState.userInfo.vehicles.length === 0) ||
          userState.userInfo.vehicles === null ? (
            <div className="offerridewarning-Container">
              <div className="offerride-Warning">
                <div className="offerridewarning-Text">
                  You can create your offer only if register your vehicle
                </div>
                <button
                  className="nav-Button"
                  onClick={() => history.push("/profile")}
                >
                  Register vehicle
                </button>
              </div>
            </div>
          ) : (
            <Card className="offer-Ride-Card">
              <Card.Item>
                <div className="card-Header">
                  <div className="card-Title">Offer a Ride</div>
                  <Toggle
                    className="offerRide-Toggle"
                    onChange={() => history.push("/bookride")}
                  />
                </div>
                <div className="card-Subtitle">
                  <p>we get you the matches asap!</p>
                </div>
              </Card.Item>
              {viewPage1 ? renderRideDetailsPage1() : renderRideDetailsPage2()}
            </Card>
          )}
        </div>
      ) : (
        <div className="offerridewarning-Container">
          <div className="offerride-Warning">
            <div className="offerridewarning-Text">
              You need to login into your account to create offer
            </div>
            <button
              className="nav-Button"
              onClick={() => history.push("/login")}
            >
              login
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OfferRide;
