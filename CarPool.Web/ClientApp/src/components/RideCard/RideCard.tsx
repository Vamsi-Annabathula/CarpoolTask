import React from "react";
import "./RideCard.sass";
import { Icon } from "office-ui-fabric-react";
import logo from "../../Images/logo.png";
import { useHistory } from "react-router";

const RideCard = (props: any) => {
  const history = useHistory();

  const timings = [
    "5am-9am",
    "9am-12pm",
    "12pm-3pm",
    "3pm-6pm",
    "6pm-9pm",
    "9pm-5am",
  ];

  const getFormattedTime = () => {
    let formattedTime: string;
    let hours: number;
    if (props.type === "offer")
      hours = new Date(props.cardDetails.journeyTime).getHours();
    else
      hours = new Date(props.cardDetails.offerDetails.journeyTime).getHours();
    if (hours >= 5 && hours < 9) formattedTime = timings[0];
    else if (hours >= 9 && hours < 12) formattedTime = timings[1];
    else if (hours >= 12 && hours < 15) formattedTime = timings[2];
    else if (hours >= 15 && hours < 18) formattedTime = timings[3];
    else if (hours >= 18 && hours < 21) formattedTime = timings[4];
    else formattedTime = timings[5];
    console.log(formattedTime);
    return formattedTime;
  };

  const formatTimeStamp = () => {
    let date: Date;
    if (props.type === "offer") date = new Date(props.cardDetails.journeyTime);
    else date = new Date(props.cardDetails.offerDetails.journeyTime);
    let formattedDate: string =
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("0" + date.getMonth()).slice(-2) +
      "/" +
      date.getUTCFullYear();
    return formattedDate;
  };

  const getStatusClass = () => {
    if (props.cardDetails.statusText === "Bookings Accepting")
      return "bookings-Accepting";
    else if (props.cardDetails.statusText === "Bookings Closed")
      return "bookings-Closed";
    else if (props.cardDetails.statusText === "Request Sent")
      return "request-Sent";
    else if (props.cardDetails.statusText === "Request Rejected")
      return "request-Rejected";
    else if (props.cardDetails.statusText === "Ride Cancelled")
      return "ride-Cancelled";
    else if (props.cardDetails.statusText === "Ride Accepted")
      return "ride-Accepted";
    else if (props.cardDetails.statusText === "Deleted") return "deleted";
    else if (props.cardDetails.statusText === "Offer Deleted")
      return "offer-Deleted";
    else return props.cardDetails.statusText;
  };

  // console.log(props);

  return (
    <div
      className={
        props.type === "ride"
          ? "rideCard-Container ride-Type"
          : "rideCard-Container"
      }
      onClick={() => {
        if (props.type === "offer")
          history.push("/view" + props.type + "/" + props.cardDetails.id);
      }}
    >
      <div className="rideCard-Text-Container">
        <div className="card-Title">{props.cardDetails.createdByUser.name}</div>
        <div className="places-Container">
          <div className="from-Container">
            <label className="field-Label">From</label>
            <div className="from-Field">
              <div className="from-Text">{props.cardDetails.sourcePlace}</div>
              <div className="ms-hiddenLgDown card-Design">
                <Icon className="source-Icon" iconName="LocationFill" />
                <Icon iconName="LocationDot" />
                <Icon iconName="LocationDot" />
                <Icon iconName="LocationDot" />
                <Icon iconName="LocationDot" />
                <Icon className="destination-Icon" iconName="Location" />
              </div>
            </div>
          </div>
          <div className="to-Container">
            <label className="field-Label">To</label>
            <div className="to-Text">{props.cardDetails.destPlace}</div>
          </div>
        </div>
        <div className="dateTime-Container">
          <div className="date-Container">
            <label className="field-Label">Date</label>
            <div className="date-Text">{formatTimeStamp()}</div>
          </div>
          <div className="time-Container">
            <label className="field-Label">Time</label>
            <div className="time-Text">{getFormattedTime()}</div>
          </div>
        </div>
        <div className="costAvailability-Container">
          <div className="cost-Container">
            <label className="field-Label">Price</label>
            {props.type === "offer" && (
              <div className="cost-Text">
                Rs.{props.cardDetails.costPerPerson}
              </div>
            )}
            {props.type === "ride" && (
              <div className="cost-Text">
                Rs.{props.cardDetails.offerDetails.costPerPerson}
              </div>
            )}
          </div>
          {props.type === "offer" && (
            <div className="availability-Container">
              <label className="field-Label">Seat Availability</label>
              <div className="availability-Text">
                {("0" + props.cardDetails.seatingCount).slice(-2)}
              </div>
            </div>
          )}
        </div>
        <div className="status-Container">
          <div className={"status-Text " + getStatusClass()}>
            {props.cardDetails.statusText}
          </div>
        </div>
      </div>
      <img className="rideCard-Pic" src={logo} alt="profile pic" />
    </div>
  );
};

export default RideCard;
