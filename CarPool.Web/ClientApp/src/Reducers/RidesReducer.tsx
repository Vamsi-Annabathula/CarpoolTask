import { IRideState } from "../Interfaces/IRideState";
import { IAction } from "../Interfaces/IAction";
import {
  FETCH_USER_RIDES_BEGIN,
  FETCH_USER_RIDES_SUCCESS,
  FETCH_USER_RIDES_FAILED,
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
import { CLOSE_ERROR, CLOSE_RESPONSE } from "../ActionTypes/UserActions";

const RidesReducer = (rideState: IRideState, action: IAction) => {
  switch (action.type) {
    case FETCH_USER_RIDES_BEGIN:
      return {
        ...rideState,
        userRides: [],
        loader: true,
        error: false,
      };

    case FETCH_USER_RIDES_SUCCESS:
      return {
        ...rideState,
        userRides: action.payload.response,
        loader: false,
        error: false,
      };

    case FETCH_USER_RIDES_FAILED:
      return {
        ...rideState,
        errorInfo: action.payload.message,
        error: true,
        loader: false,
      };

    case FETCH_RIDE_BEGIN:
      return {
        ...rideState,
        rideDetails: {},
        loader: true,
        error: false,
      };

    case FETCH_RIDE_SUCCESS:
      return {
        ...rideState,
        rideDetails: action.payload.response,
        loader: false,
        error: false,
      };

    case FETCH_RIDE_FAILED:
      return {
        ...rideState,
        errorInfo: action.payload.message,
        loader: false,
        error: true,
      };

    case REQUEST_RIDE_BEGIN:
      return {
        ...rideState,
        loader: true,
        error: false,
      };

    case REQUEST_RIDE_SUCCESS:
      return {
        ...rideState,
        loader: false,
        response: action.payload.message,
        displayResponse: true,
        error: false,
      };

    case REQUEST_RIDE_FAILED:
      return {
        ...rideState,
        errorInfo: action.payload.message,
        loader: false,
        error: true,
      };

    case UPDATE_RIDE_BEGIN:
      return {
        ...rideState,
        loader: true,
        error: false,
      };

    case UPDATE_RIDE_SUCCESS:
      return {
        ...rideState,
        loader: false,
        response: action.payload.message,
        displayResponse: true,
        error: false,
      };

    case UPDATE_RIDE_FAILED:
      return {
        ...rideState,
        errorInfo: action.payload.message,
        loader: false,
        error: true,
      };

    case CANCEL_RIDE_BEGIN:
      return {
        ...rideState,
        loader: true,
        error: false,
      };

    case CANCEL_RIDE_SUCCESS:
      return {
        ...rideState,
        loader: false,
        response: action.payload.message,
        displayResponse: true,
        error: false,
      };

    case CANCEL_RIDE_FAILED:
      return {
        ...rideState,
        errorInfo: action.payload.message,
        loader: false,
        error: true,
      };

    case ACCEPT_OR_REJECT_RIDE_BEGIN:
      return {
        ...rideState,
        loader: true,
        error: false,
      };

    case ACCEPT_OR_REJECT_RIDE_SUCCESS:
      return {
        ...rideState,
        loader: false,
        response: action.payload.message,
        displayResponse: true,
        error: false,
      };

    case ACCEPT_OR_REJECT_RIDE_FAILED:
      return {
        ...rideState,
        errorInfo: action.payload.message,
        loader: false,
        error: true,
      };

    case CLOSE_ERROR:
      return {
        ...rideState,
        error: false,
      };

    case CLOSE_RESPONSE:
      return {
        ...rideState,
        error: false,
        displayResponse: false,
      };

    default:
      return rideState;
  }
};

export default RidesReducer;
