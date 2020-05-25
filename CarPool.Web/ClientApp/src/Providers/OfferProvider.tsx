import React, { createContext, useReducer } from "react";
import { IOfferState } from "../Interfaces/IOfferState";
import OffersReducer from "../Reducers/OffersReducer";

export const OfferContext = createContext({});

const InitialOfferState: IOfferState = {
  userOffers: [],
  offersMatches: [],
  offerDetails: {},
  offerRides: [],
  loader: false,
  error: false,
  searchSuccess: false,
  errorInfo: "Something went wrong!!",
  response: "",
};

const OfferContextProvider = (props: any) => {
  // const [offerState, offerDispatch] = useReducer(
  //   OffersReducer,
  //   InitialOfferState
  // );
  return (
    <OfferContext.Provider value={{ ...InitialOfferState }}>
      {props.children}
    </OfferContext.Provider>
  );
};

export default OfferContextProvider;
