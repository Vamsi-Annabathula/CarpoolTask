import { createAction, postData, GetData } from "./Common";
import {
  LOGIN_BEGIN,
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
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

export const SignupAPI = (userDetails: any, userDispatch: any) => {
  userDispatch(createAction(SIGNUP_BEGIN));
  postData("/user/signup", userDetails)
    .then((data) => {
      console.log(data);
      userDispatch(createAction(SIGNUP_SUCCESS, data));
    })
    .catch((error) => {
      console.log("error:" + error);
      userDispatch(createAction(SIGNUP_FAILED, error));
    });
};

export const loginAPI = (loginCredentails: any, userDispatch: any) => {
  userDispatch(createAction(LOGIN_BEGIN));
  postData("/user/login", loginCredentails)
    .then((data) => {
      console.log(data);
      userDispatch(createAction(LOGIN_SUCCESS, data));
    })
    .catch((error) => {
      console.log(error);
      userDispatch(createAction(LOGIN_FAILED, error));
    });
};

export const fetchUser = (userID: number, userDispatch: any) => {
  userDispatch(createAction(FETCH_USER_BEGIN));
  GetData("/user/" + userID)
    .then((data) => {
      console.log(data);
      userDispatch(createAction(FETCH_USER_SUCCESS, data));
    })
    .catch((error) => {
      console.log(error);
      userDispatch(createAction(FETCH_USER_FAILED, error));
    });
};

export const addVehicle = (vehicleDetails: any, userDispatch: any) => {
  userDispatch(createAction(ADD_VEHICLE_BEGIN));
  postData("/vehicle/add", vehicleDetails)
    .then((data) => {
      console.log(data);
      userDispatch(createAction(ADD_VEHICLE_SUCCESS, data));
    })
    .catch((error) => {
      console.log(error);
      userDispatch(createAction(ADD_VEHICLE_FAILED, error));
    });
};

export const updateVehicle = (vehicleDetails: any, userDispatch: any) => {
  userDispatch(createAction(UPDATE_VEHICLE_BEGIN));
  postData("/vehicle/update", vehicleDetails)
    .then((data) => {
      console.log(data);
      userDispatch(createAction(UPDATE_VEHICLE_SUCCESS, data));
    })
    .catch((error) => {
      console.log(error);
      userDispatch(createAction(UPDATE_VEHICLE_FAILED, error));
    });
};

export const deleteVehicle = (vehicleID: any, userDispatch: any) => {
  userDispatch(createAction(DELETE_VEHICLE_BEGIN));
  postData("/vehicle/delete/" + vehicleID)
    .then((data) => {
      console.log(data);
      userDispatch(createAction(DELETE_VEHICLE_SUCCESS, data));
    })
    .catch((error) => {
      console.log(error);
      userDispatch(createAction(DELETE_VEHICLE_FAILED, error));
    });
};

export const updateUser = (userDetails: any, userDispatch: any) => {
  userDispatch(createAction(UPDATE_USER_BEGIN));
  postData("/user/updateuser", userDetails)
    .then((data) => {
      console.log(data);
      userDispatch(createAction(UPDATE_USER_SUCCESS, data));
      fetchUser(userDetails.id, userDispatch);
    })
    .catch((error) => {
      console.log(error);
      userDispatch(createAction(UPDATE_USER_FAILED, error));
    });
};
