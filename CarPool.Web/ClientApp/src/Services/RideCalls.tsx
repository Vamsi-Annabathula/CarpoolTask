import { createAction, postData, GetData } from "./Common";
import {
  FETCH_USER_RIDES_BEGIN,
  FETCH_USER_RIDES_FAILED,
  FETCH_USER_RIDES_SUCCESS,
  FETCH_RIDE_BEGIN,
  FETCH_RIDE_SUCCESS,
  FETCH_RIDE_FAILED,
  UPDATE_RIDE_BEGIN,
  UPDATE_RIDE_SUCCESS,
  UPDATE_RIDE_FAILED,
  CANCEL_RIDE_BEGIN,
  CANCEL_RIDE_SUCCESS,
  CANCEL_RIDE_FAILED,
  ACCEPT_OR_REJECT_RIDE_BEGIN,
  ACCEPT_OR_REJECT_RIDE_SUCCESS,
  ACCEPT_OR_REJECT_RIDE_FAILED,
  REQUEST_RIDE_BEGIN,
  REQUEST_RIDE_SUCCESS,
  REQUEST_RIDE_FAILED,
} from "../ActionTypes/RideActions";
import { fetchOfferRides } from "./OfferCalls";

export const fetchUserRides = (userID: any, rideDispatch: any) => {
  rideDispatch(createAction(FETCH_USER_RIDES_BEGIN));
  GetData("/user/rides/" + userID)
    .then((data) => {
      console.log(data);
      rideDispatch(createAction(FETCH_USER_RIDES_SUCCESS, data));
    })
    .catch((error) => {
      console.log("error:" + error);
      rideDispatch(createAction(FETCH_USER_RIDES_FAILED, error));
    });
};

export const fetchRide = (rideID: any, rideDispatch: any) => {
  rideDispatch(createAction(FETCH_RIDE_BEGIN));
  GetData("/ride/" + rideID)
    .then((data) => {
      console.log(data);
      rideDispatch(createAction(FETCH_RIDE_SUCCESS, data));
    })
    .catch((error) => {
      console.log("error:" + error);
      rideDispatch(createAction(FETCH_RIDE_FAILED, error));
    });
};

export const requestRide = (rideDetails: any, rideDispatch: any) => {
  rideDispatch(createAction(REQUEST_RIDE_BEGIN));
  postData("/ride/requestride", rideDetails)
    .then((data) => {
      console.log(data);
      rideDispatch(createAction(REQUEST_RIDE_SUCCESS, data));
    })
    .catch((error) => {
      console.log(error);
      rideDispatch(createAction(REQUEST_RIDE_FAILED, error));
    });
};

export const updateRide = (rideDetails: any, rideDispatch: any) => {
  rideDispatch(createAction(UPDATE_RIDE_BEGIN));
  postData("/ride/updateride", rideDetails)
    .then((data) => {
      console.log(data);
      rideDispatch(createAction(UPDATE_RIDE_SUCCESS, data));
    })
    .catch((error) => {
      console.log(error);
      rideDispatch(createAction(UPDATE_RIDE_FAILED, error));
    });
};

export const cancelRide = (rideID: any, rideDispatch: any) => {
  rideDispatch(createAction(CANCEL_RIDE_BEGIN));
  postData("/ride/cancelride" + rideID)
    .then((data) => {
      console.log(data);
      rideDispatch(createAction(CANCEL_RIDE_SUCCESS, data));
    })
    .catch((error) => {
      console.log(error);
      rideDispatch(createAction(CANCEL_RIDE_FAILED, error));
    });
};

export const acceptOrRejectRide = (rideDetails: any, rideDispatch: any,offerDispatch:any) => {
  rideDispatch(createAction(ACCEPT_OR_REJECT_RIDE_BEGIN));
  postData("/ride/acceptorrejectride", rideDetails)
    .then((data) => {
      console.log(data);
      rideDispatch(createAction(ACCEPT_OR_REJECT_RIDE_SUCCESS, data));
      fetchOfferRides(rideDetails.offerDetails.id, offerDispatch);
    })
    .catch((error) => {
      console.log(error);
      rideDispatch(createAction(ACCEPT_OR_REJECT_RIDE_FAILED, error));
    });
};
