import { IUserState } from "../Interfaces/IUserState";
import { IAction } from "../Interfaces/IAction";
import {
  LOGIN_BEGIN,
  LOGOUT,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  CLOSE_ERROR,
  CLOSE_RESPONSE,
  ADD_VEHICLE_BEGIN,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_FAILED,
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  UPDATE_VEHICLE_BEGIN,
  UPDATE_VEHICLE_SUCCESS,
  UPDATE_VEHICLE_FAILED,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_VEHICLE_BEGIN,
  DELETE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_FAILED,
} from "../ActionTypes/UserActions";
import {
  CREATE_OFFER_BEGIN,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAILED,
} from "../ActionTypes/OfferActions";

const UserReducer = (userState: IUserState, action: IAction) => {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {
        ...userState,
        loader: true,
        error: false,
        displayResponse: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...userState,
        userInfo: action.payload.response,
        userID: action.payload.response.id,
        isAuthenticated: true,
        loader: false,
        error: false,
      };

    case LOGIN_FAILED:
      return {
        ...userState,
        errorInfo: action.payload.message,
        isAuthenticated: false,
        error: true,
        loader: false,
      };

    case SIGNUP_BEGIN:
      return {
        ...userState,
        loader: true,
        error: false,
      };

    case SIGNUP_SUCCESS:
      return {
        ...userState,
        response: action.payload.message,
        loader: false,
        error: false,
        displayResponse: true,
      };

    case SIGNUP_FAILED:
      return {
        ...userState,
        errorInfo: action.payload.message,
        error: true,
        loader: false,
      };

    case ADD_VEHICLE_BEGIN:
      return {
        ...userState,
        loader: true,
        error: false,
      };

    case ADD_VEHICLE_SUCCESS:
      return {
        ...userState,
        response: action.payload.message,
        displayResponse: true,
        loader: false,
        error: false,
      };

    case ADD_VEHICLE_FAILED:
      return {
        ...userState,
        errorInfo: action.payload.message,
        error: true,
        loader: false,
      };

    case CREATE_OFFER_BEGIN:
      return {
        ...userState,
        loader: true,
        error: false,
      };

    case CREATE_OFFER_SUCCESS:
      return {
        ...userState,
        response: action.payload.message,
        displayResponse: true,
        loader: false,
        error: false,
      };

    case CREATE_OFFER_FAILED:
      return {
        ...userState,
        errorInfo: action.payload.message,
        error: true,
        loader: false,
      };

    case UPDATE_VEHICLE_BEGIN:
      return {
        ...userState,
        loader: true,
        error: false,
      };

    case UPDATE_VEHICLE_SUCCESS:
      return {
        ...userState,
        response: action.payload.message,
        loader: false,
        error: false,
        displayResponse: true,
      };

    case UPDATE_VEHICLE_FAILED:
      return {
        ...userState,
        errorInfo: action.payload.message,
        error: true,
        loader: false,
      };

    case FETCH_USER_BEGIN:
      return {
        ...userState,
        userInfo: {},
        loader: true,
        error: false,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...userState,
        userInfo: action.payload.response,
        loader: false,
        error: false,
      };

    case FETCH_USER_FAILED:
      return {
        ...userState,
        errorInfo: action.payload.message,
        error: true,
        loader: false,
      };

    case UPDATE_USER_BEGIN:
      return {
        ...userState,
        loader: true,
        error: false,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...userState,
        response: action.payload.message,
        displayResponse: true,
        loader: false,
        error: false,
      };

    case UPDATE_USER_FAILED:
      return {
        ...userState,
        errorInfo: action.payload.message,
        error: true,
        loader: false,
      };

    case DELETE_VEHICLE_BEGIN:
      return {
        ...userState,
        loader: true,
        error: false,
      };

    case DELETE_VEHICLE_SUCCESS:
      return {
        ...userState,
        response: action.payload.message,
        displayResponse: true,
        loader: false,
        error: false,
      };

    case DELETE_VEHICLE_FAILED:
      return {
        ...userState,
        errorInfo: action.payload.message,
        error: true,
        loader: false,
      };

    case LOGOUT:
      return {
        ...userState,
        userInfo: {},
        isAuthenticated: false,
      };

    case CLOSE_ERROR:
      return {
        ...userState,
        error: false,
      };

    case CLOSE_RESPONSE:
      return {
        ...userState,
        error: false,
        displayResponse: false,
      };

    default:
      return userState;
  }
};

export default UserReducer;
