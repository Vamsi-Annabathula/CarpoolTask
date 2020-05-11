import React, { useContext, useEffect, Fragment } from "react";
import { RideContext } from "../../Providers/RideProvider";
import RideCard from "../RideCard/RideCard";
import { UserContext } from "../../Providers/UserProvider";
import { fetchUserRides } from "../../Services/RideCalls";
import { useHistory } from "react-router";
import backgroundImage from "../../Images/applicationbg.png";
import "./RidesHistory.sass";
import ResponsePopup from "../ResponsePopup/ResponsePopup";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import Loader from "../Loader/Loader";

const RidesHistory = () => {
  const { rideState, rideDispatch }: any = useContext(RideContext);
  const { userState }: any = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    fetchUserRides(userState.userID, rideDispatch);
  }, []);

  return (
    <div className="ridesHistory-Container">
      {renderPopupsandLoader(rideState, rideDispatch)}
      <img
        className="ms-hiddenMdDown rideHistory-Background"
        src={backgroundImage}
        alt="rideHistory-background"
      />
      <label className="bookedrides-Text">Booked Rides</label>
      <div className="bookedrides-Container">
        {rideState.userRides.length !== 0 ? (
          <Fragment>
            {rideState.userRides.map((ride: any, index: number) => (
              <RideCard key={index} cardDetails={ride} type="ride" />
            ))}
          </Fragment>
        ) : (
          <div className="norides-Container">
            <div className="norides-Text">
              No previous rides in your account
            </div>
            <button
              className="bookride-Navbutton"
              onClick={() => history.push("/bookride")}
            >
              book ride
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const renderPopupsandLoader = (rideState: any, rideDispatch: any) => {
  return (
    <Fragment>
      {rideState.displayResponse && (
        <ResponsePopup message={rideState.response} dispatch={rideDispatch} />
      )}
      {rideState.error && (
        <ErrorPopup message={rideState.errorInfo} dispatch={rideDispatch} />
      )}
      {rideState.loader && <Loader />}
    </Fragment>
  );
};

export default RidesHistory;
