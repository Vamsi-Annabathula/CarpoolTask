import React from "react";
import Header from "../Header/Header";
import Signup from "../Signup/Signup";
import { Route } from "react-router-dom";
import Login from "../Login/Login";
import UserHome from "../UserHome/UserHome";
import BookRide from "../BookRide/BookRide";
import OfferRide from "../OfferRide/OfferRide";
import OffersHistory from "../OffersHistory/OffersHistory";
import RidesHistory from "../RidesHistory/RidesHistory";
import OfferContextProvider from "../../contexts/OfferContext";
import RideContextProvider from "../../contexts/RideContext";
import Profile from "../Profile/Profile";
import ViewCard from "../ViewCard/ViewCard";
import "office-ui-fabric-react/dist/css/fabric.css";
import "./Layout.sass";

const Layout = () => {
  return (
    <div className="layout" dir="ltr">
      <Header />
      <div className="content">
        <Route exact path="/" component={Signup} />
        <Route exact path="/login" component={Login} />
        <OfferContextProvider>
          <RideContextProvider>
            <Route exact path="/userhome" component={UserHome} />
            <Route exact path="/bookride" component={BookRide} />
            <Route exact path="/offerride" component={OfferRide} />
            <Route exact path="/offershistory" component={OffersHistory} />
            <Route exact path="/rideshistory" component={RidesHistory} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/viewoffer/:id" component={ViewCard} />
            {/* <Route exact path="/viewride/:id">
              <ViewCard type="ride" />
            </Route> */}
          </RideContextProvider>
        </OfferContextProvider>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
