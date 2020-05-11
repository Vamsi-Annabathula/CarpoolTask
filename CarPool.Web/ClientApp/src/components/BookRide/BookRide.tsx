import { useHistory } from "react-router";
import { Card } from "@uifabric/react-cards";
import { Toggle, Icon } from "office-ui-fabric-react";
import { UserContext } from "../../Providers/UserProvider";
import { searchOffers } from "../../Services/OfferCalls";
import { OfferContext } from "../../Providers/OfferProvider";
import "./BookRide.sass";
import Loader from "../Loader/Loader";
import RideCard from "../RideCard/RideCard";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import ResponsePopup from "../ResponsePopup/ResponsePopup";
import backgroundImage from "../../Images/applicationbg.png";
import React, { Fragment, useState, useContext, useEffect } from "react";

enum Fields {
  Source,
  Destination,
  Date,
}

const BookRide = () => {
  let { offerState, offerDispatch }: any = useContext(OfferContext);
  const { userState }: any = useContext(UserContext);

  const history = useHistory();

  const activateField = (field: Fields) => {
    if (field === Fields.Source)
      setFieldActive({ ...fieldActive, source: true });
    else if (field === Fields.Destination)
      setFieldActive({ ...fieldActive, destination: true });
    else setFieldActive({ ...fieldActive, showDateFormat: true, date: true });
  };

  const disableField = (event: any, field: Fields) => {
    if (event.target.value === "") {
      if (field === Fields.Source)
        setFieldActive({ ...fieldActive, source: false });
      else if (field === Fields.Destination)
        setFieldActive({ ...fieldActive, destination: false });
      else
        setFieldActive({ ...fieldActive, showDateFormat: false, date: false });
    }
  };

  const handleButtonSelect = (id: number) => {
    let timingsList: any = initialTimings;
    timingsList[id].isSelected = true;
    setLocalState({ ...localState, time: timingsList[id].text });
    setTimings(timingsList);
  };

  const handleSourceChange = (event: any) => {
    //places api call based on the event.target.value and add to places
    setFieldActive({ ...fieldActive, placesDropDown: true });
    setLocalState({ ...localState, source: event.target.value });
  };

  const handleDestinationChange = (event: any) => {
    //places api call based on the event.target.value and add to places
    setFieldActive({ ...fieldActive, placesDropDown: true });
    setLocalState({ ...localState, destination: event.target.value });
  };

  const convertToTimestamp = (date: string, journeytime: string) => {
    var myDate = date.split("/");
    let time: number;
    if (journeytime.charAt(1) === "p")
      time = parseInt(journeytime.charAt(0)) + 12;
    else if (journeytime.charAt(2) === "p")
      time = parseInt(journeytime.slice(0, 2));
    else time = parseInt(journeytime.charAt(0));
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

  const [errorState, setErrorState] = useState({
    showError: false,
    errorText: "",
  });
  const isValidCredentials = () => {
    if (localState.source === "") {
      setErrorState({ showError: true, errorText: "enter valid source" });
      return false;
    } else if (localState.destination === "") {
      setErrorState({ showError: true, errorText: "enter valid destination" });
      return false;
    } else if (localState.date === "") {
      setErrorState({
        showError: true,
        errorText: "enter date in format dd/mm/yyyy",
      });
      return false;
    } else if (localState.time === "") {
      setErrorState({ showError: true, errorText: "select time of journey" });
      return false;
    } else return true;
  };

  const handleSearch = () => {
    // history.push("/searchresult");
    if (isValidCredentials()) {
      let search: any = {
        sourcePlace: localState.source,
        destPlace: localState.destination,
        journeyTime: convertToTimestamp(localState.date, localState.time),
      };
      console.log(search);
      searchOffers(search, offerDispatch);
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

  const [places] = useState([]);

  const [timings, setTimings] = useState(initialTimings);

  const [fieldActive, setFieldActive] = useState({
    source: false,
    destination: false,
    placesDropDown: false,
    showDateFormat: false,
    date: false,
  });

  const [localState, setLocalState] = useState({
    source: "",
    destination: "",
    date: "",
    time: "",
  });

  const [searchMatches, setsearchMatches] = useState([]);

  useEffect(() => {
    setsearchMatches(offerState.offersMatches);
    return () => {
      offerDispatch()
      setsearchMatches([]);
    };
  }, [offerState.offersMatches]);

  const renderSearchBox = () => {
    return (
      <Fragment>
        <div className="source">
          <label className={fieldActive.source ? "field-active" : ""}>
            From
          </label>
          <input
            className=" ms-Grid-col ms-sm11 ms-md11 ms-lg11 floating-Label"
            type="text"
            value={localState.source}
            onFocus={() => activateField(Fields.Source)}
            onBlur={(event: any) => disableField(event, Fields.Source)}
            onChange={handleSourceChange}
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
                    setLocalState({ ...localState, source: place });
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
            className=" ms-Grid-col ms-sm11 ms-md11 ms-lg11 floating-Label"
            type="text"
            value={localState.destination}
            onFocus={() => activateField(Fields.Destination)}
            onBlur={(event: any) => disableField(event, Fields.Destination)}
            onChange={handleDestinationChange}
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
                    setLocalState({ ...localState, destination: place });
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
          <label className={fieldActive.date ? "field-active" : ""}>Date</label>
          <input
            className=" ms-Grid-col ms-sm11 ms-md11 ms-lg11 floating-Label"
            type="text"
            placeholder={fieldActive.showDateFormat ? "dd/mm/yyyy" : ""}
            value={localState.date}
            onFocus={() => activateField(Fields.Date)}
            onBlur={(event: any) => disableField(event, Fields.Date)}
            onChange={(event: any) =>
              setLocalState({ ...localState, date: event.target.value })
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
                onClick={() => handleButtonSelect(index)}
              >
                {time.text}
              </button>
            ))}
          </div>
        </div>
      </Fragment>
    );
  };

  const renderBookRideSearchCard = () => {
    // debugger;
    return (
      <Card className="book-Ride-Card">
        <Card.Item>
          <div className="card-Header">
            <div className="card-Title">Book a Ride</div>
            <Toggle
              className="bookride-Toggle"
              defaultChecked
              onChange={() => history.push("/offerride")}
            />
          </div>
          <div className="card-Subtitle">
            <p>we get you the matches asap!</p>
          </div>
        </Card.Item>
        {errorState.showError && (
          <div className="error-Text">{errorState.errorText}</div>
        )}
        <Card.Item className="search-Box">{renderSearchBox()}</Card.Item>
        <button className="search" onClick={handleSearch}>
          Search
        </button>
      </Card>
    );
  };

  const renderMatches = () => {
    return (
      <div className="matches">
        <div className="matches-Header">Your Matches</div>
        <div className="offers">
          {searchMatches.map((offer: any, index: number) =>
            index < 2 ? (
              <RideCard key={index} type="offer" cardDetails={offer} />
            ) : (
              <Fragment key={index} />
            )
          )}
        </div>
        <button className="matches-Button">Next>></button>
      </div>
    );
  };
  return (
    <Fragment>
      {userState.isAuthenticated ? (
        <Fragment />
      ) : (
        <div className="bookridewarning-Container">
          <div className="bookridewarning-Text">
            You can view the rides but you need to login into your account to
            book the ride
          </div>
          <button className="nav-Button" onClick={() => history.push("/login")}>
            login
          </button>
        </div>
      )}

      <div
        className="book-Ride"
        onFocus={() => {
          console.log("focused");
          if (errorState.showError) errorState.showError = false;
        }}
      >
        {renderPopupsandLoader(offerState, offerDispatch)}
        <img
          className="ms-hiddenMdDown bookride-Background"
          src={backgroundImage}
          alt="bookride-background"
        />
        <div className="search-Card">{renderBookRideSearchCard()}</div>
        {offerState.searchSuccess ? (
          <Fragment>
            {searchMatches.length ? (
              renderMatches()
            ) : (
              <div className="nomatches-Found">No matches found</div>
            )}
          </Fragment>
        ) : (
          <Fragment />
        )}
      </div>
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

export default BookRide;
