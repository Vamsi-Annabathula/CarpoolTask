import React, { createContext, useReducer } from "react";
import { IUserState } from "../Interfaces/IUserState";
import UserReducer from "../Reducers/UserReducer";

export const UserContext = createContext({});

const InitialUserState: IUserState = {
  isAuthenticated: false,
  userID: "1",
  userInfo: {},
  loader: false,
  error: false,
  errorInfo: "Something went wrong!!!",
  response: "",
  displayResponse: false,
};

const UserContextProvider = (props: any) => {
  if (localStorage.getItem("isAuthenticated")) {
    let user: any = localStorage.getItem("userInfo");
    InitialUserState.isAuthenticated = true;
    InitialUserState.userInfo = JSON.parse(user);
    InitialUserState.userID = InitialUserState.userInfo.id;
  }
  const [userState, userDispatch] = useReducer(UserReducer, InitialUserState);
  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
