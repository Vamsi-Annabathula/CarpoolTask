import React, { createContext, useReducer } from "react";
import { IRideState } from "../Interfaces/IRideState";
import RidesReducer from "../Reducers/RidesReducer";

export const RideContext = createContext({});

const InitialRideState: IRideState = {
  userRides: [],
  rideDetails: {},
  loader: false,
  error: false,
  errorInfo: "Something went wrong!",
  response: "",
};

const RideContextProvider = (props: any) => {
  const [rideState, rideDispatch] = useReducer(RidesReducer, InitialRideState);

  return (
    <RideContext.Provider value={{ rideState, rideDispatch }}>
      {props.children}
    </RideContext.Provider>
  );
};

export default RideContextProvider;
