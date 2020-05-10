import { createAction, postData, GetData } from "./Common";
import {
  FETCH_USER_OFFERS_BEGIN,
  FETCH_USER_OFFERS_SUCCESS,
  FETCH_USER_OFFERS_FAILED,
  CREATE_OFFER_BEGIN,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAILED,
  UPDATE_OFFER_BEGIN,
  UPDATE_OFFER_FAILED,
  UPDATE_OFFER_SUCCESS,
  DELETE_OFFER_BEGIN,
  DELETE_OFFER_FAILED,
  DELETE_OFFER_SUCCESS,
  SEARCH_OFFERS_BEGIN,
  SEARCH_OFFERS_SUCCESS,
  SEARCH_OFFERS_FAILED,
  FETCH_OFFER_BEGIN,
  FETCH_OFFER_SUCCESS,
  FETCH_OFFER_FAILED,
  FETCH_OFFER_RIDES_BEGIN,
  FETCH_OFFER_RIDES_SUCCESS,
  FETCH_OFFER_RIDES_FAILED,
} from "../ActionTypes/OfferActions";

export const fetchUserOffers = (userID: any, offerDispatch: any) => {
  offerDispatch(createAction(FETCH_USER_OFFERS_BEGIN));
  GetData("/user/offers/" + userID)
    .then((data) => {
      console.log(data);
      offerDispatch(createAction(FETCH_USER_OFFERS_SUCCESS, data));
    })
    .catch((error) => {
      console.log("error:" + error);
      offerDispatch(createAction(FETCH_USER_OFFERS_FAILED, error));
    });
};

export const fetchOffer = (offerID: any, offerDispatch: any) => {
  debugger;
  offerDispatch(createAction(FETCH_OFFER_BEGIN));
  GetData("/offer/" + offerID)
    .then((data) => {
      console.log(data);
      offerDispatch(createAction(FETCH_OFFER_SUCCESS, data));
      fetchOfferRides(offerID, offerDispatch);
    })
    .catch((error) => {
      console.log("error:" + error);
      offerDispatch(createAction(FETCH_OFFER_FAILED, error));
    });
};

export const fetchOfferRides = (offerID: any, offerDispatch: any) => {
  offerDispatch(createAction(FETCH_OFFER_RIDES_BEGIN));
  GetData("/ride/offer/" + offerID)
    .then((data) => {
      console.log(data);
      offerDispatch(createAction(FETCH_OFFER_RIDES_SUCCESS, data));
    })
    .catch((error) => {
      console.log("error:" + error);
      offerDispatch(createAction(FETCH_OFFER_RIDES_FAILED, error));
    });
};

export const createOffer = (offerDetails: any, offerDispatch: any) => {
  offerDispatch(createAction(CREATE_OFFER_BEGIN));
  postData("/offer/create", offerDetails)
    .then((data) => {
      console.log(data);
      offerDispatch(createAction(CREATE_OFFER_SUCCESS, data));
    })
    .catch((error) => {
      console.log(error);
      offerDispatch(createAction(CREATE_OFFER_FAILED, error));
    });
};

export const updateOffer = (offerDetails: any, offerDispatch: any) => {
  offerDispatch(createAction(UPDATE_OFFER_BEGIN));
  postData("/offer/update", offerDetails)
    .then((data) => {
      console.log(data);
      offerDispatch(createAction(UPDATE_OFFER_SUCCESS, data));
      fetchOffer(offerDetails.id, offerDispatch);
    })
    .catch((error) => {
      console.log(error);
      offerDispatch(createAction(UPDATE_OFFER_FAILED, error));
    });
};

export const deleteOffer = (offerID: any, offerDispatch: any) => {
  offerDispatch(createAction(DELETE_OFFER_BEGIN));
  postData("/offer/delete/" + offerID)
    .then((data) => {
      console.log(data);
      offerDispatch(createAction(DELETE_OFFER_SUCCESS, data));
      fetchOffer(offerID, offerDispatch);
    })
    .catch((error) => {
      console.log(error);
      offerDispatch(createAction(DELETE_OFFER_FAILED, error));
    });
};

export const searchOffers = (searchDetails: any, offerDispatch: any) => {
  offerDispatch(createAction(SEARCH_OFFERS_BEGIN));
  postData("/offer/searchoffer", searchDetails)
    .then((data) => {
      console.log(data);
      offerDispatch(createAction(SEARCH_OFFERS_SUCCESS, data));
    })
    .catch((error) => {
      console.log(error);
      offerDispatch(createAction(SEARCH_OFFERS_FAILED, error));
    });
};
