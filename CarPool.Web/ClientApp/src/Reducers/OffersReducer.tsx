import { IOfferState } from "../Interfaces/IOfferState";
import { IAction } from "../Interfaces/IAction";
import {
  FETCH_USER_OFFERS_BEGIN,
  FETCH_USER_OFFERS_SUCCESS,
  FETCH_USER_OFFERS_FAILED,
  SEARCH_OFFERS_BEGIN,
  SEARCH_OFFERS_SUCCESS,
  SEARCH_OFFERS_FAILED,
  FETCH_OFFER_BEGIN,
  FETCH_OFFER_SUCCESS,
  FETCH_OFFER_FAILED,
  CREATE_OFFER_BEGIN,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAILED,
  UPDATE_OFFER_BEGIN,
  UPDATE_OFFER_SUCCESS,
  UPDATE_OFFER_FAILED,
  DELETE_OFFER_BEGIN,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAILED,
  FETCH_OFFER_RIDES_BEGIN,
  FETCH_OFFER_RIDES_SUCCESS,
  FETCH_OFFER_RIDES_FAILED,
} from "../ActionTypes/OfferActions";
import { CLOSE_ERROR, CLOSE_RESPONSE } from "../ActionTypes/UserActions";

const OffersReducer = (offerState: IOfferState, action: IAction) => {
  switch (action.type) {
    case FETCH_USER_OFFERS_BEGIN:
      return {
        ...offerState,
        userOffers: [],
        loader: true,
        error: false,
      };

    case FETCH_USER_OFFERS_SUCCESS:
      return {
        ...offerState,
        userOffers: action.payload.response,
        loader: false,
        error: false,
      };

    case FETCH_USER_OFFERS_FAILED:
      return {
        ...offerState,
        errorInfo: action.payload.message,
        error: true,
        loader: false,
      };

    case SEARCH_OFFERS_BEGIN:
      return {
        ...offerState,
        offersMatches: [],
        loader: true,
        error: false,
      };

    case SEARCH_OFFERS_SUCCESS:
      return {
        ...offerState,
        offersMatches: action.payload.response,
        searchSuccess: true,
        loader: false,
        error: false,
      };

    case SEARCH_OFFERS_FAILED:
      return {
        ...offerState,
        searchSuccess: false,
        errorInfo: action.payload.message,
        error: true,
        loader: false,
      };

    case FETCH_OFFER_BEGIN:
      return {
        ...offerState,
        offerDetails: {},
        loader: true,
        error: false,
      };

    case FETCH_OFFER_SUCCESS:
      return {
        ...offerState,
        offerDetails: action.payload.response,
        loader: false,
        error: false,
      };

    case FETCH_OFFER_FAILED:
      return {
        ...offerState,
        errorInfo: action.payload.message,
        loader: false,
        error: true,
      };

    case FETCH_OFFER_RIDES_BEGIN:
      return {
        ...offerState,
        offerRides: [],
        loader: true,
        error: false,
      };

    case FETCH_OFFER_RIDES_SUCCESS:
      return {
        ...offerState,
        offerRides: action.payload.response,
        loader: false,
        error: false,
      };

    case FETCH_OFFER_RIDES_FAILED:
      return {
        ...offerState,
        errorInfo: action.payload.message,
        loader: false,
        error: true,
      };

    case CREATE_OFFER_BEGIN:
      return {
        ...offerState,
        loader: true,
        error: false,
      };

    case CREATE_OFFER_SUCCESS:
      return {
        ...offerState,
        response: action.payload.message,
        displayResponse: true,
        loader: false,
        error: false,
      };

    case CREATE_OFFER_FAILED:
      return {
        ...offerState,
        errorInfo: action.payload.message,
        loader: false,
        error: true,
      };

    case UPDATE_OFFER_BEGIN:
      return {
        ...offerState,
        loader: true,
        error: false,
      };

    case UPDATE_OFFER_SUCCESS:
      return {
        ...offerState,
        response: action.payload.message,
        displayResponse: true,
        loader: false,
        error: false,
      };

    case UPDATE_OFFER_FAILED:
      return {
        ...offerState,
        errorInfo: action.payload.message,
        loader: false,
        error: true,
      };

    case DELETE_OFFER_BEGIN:
      return {
        ...offerState,
        loader: true,
        error: false,
      };

    case DELETE_OFFER_SUCCESS:
      return {
        ...offerState,
        response: action.payload.message,
        displayResponse: true,
        loader: false,
        error: false,
      };

    case DELETE_OFFER_FAILED:
      return {
        ...offerState,
        errorInfo: action.payload.message,
        loader: false,
        error: true,
      };

    case CLOSE_ERROR:
      return {
        ...offerState,
        error: false,
      };

    case CLOSE_RESPONSE:
      return {
        ...offerState,
        error: false,
        displayResponse: false,
      };

    default:
      return offerState;
  }
};

export default OffersReducer;
