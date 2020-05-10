import React, { useContext, useEffect, Fragment } from "react";
import RideCard from "../RideCard/RideCard";
import { OfferContext } from "../../contexts/OfferContext";
import { useHistory } from "react-router";
import { fetchUserOffers } from "../../Services/OfferCalls";
import { UserContext } from "../../contexts/UserContext";
import backgroundImage from "../../Images/applicationbg.png";
import "./OffersHistory.sass";
import ResponsePopup from "../ResponsePopup/ResponsePopup";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import Loader from "../Loader/Loader";

const OffersHistory = () => {
  const { offerState, offerDispatch }: any = useContext(OfferContext);
  const { userState }: any = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    fetchUserOffers(userState.userID, offerDispatch);
  }, []);

  return (
    <div className="offersHistory-Container">
      {renderPopupsandLoader(offerState, offerDispatch)}
      <img
        className="ms-hiddenMdDown offersHistory-Background"
        src={backgroundImage}
        alt="offersHistory-background"
      />
      <div className="offersHistory-Title">
        <label className="offeredrides-Text">Offered Rides</label>
      </div>
      {offerState.userOffers.length !== 0 ? (
        <button
          className="createoffer-Navbutton"
          onClick={() => history.push("/offerride")}
        >
          create new offer
        </button>
      ) : (
        <Fragment />
      )}
      <div className="offeredrides-Container">
        {offerState.userOffers.length !== 0 ? (
          <Fragment>
            {offerState.userOffers.map((offer: any, index: number) => (
              <RideCard key={index} cardDetails={offer} type="offer" />
            ))}
          </Fragment>
        ) : (
          <div className="nooffers-Container">
            <div className="nooffers-Text">
              No previous offers in your account
            </div>
            <button
              className="createoffer-Navbutton"
              onClick={() => history.push("/offerride")}
            >
              create new offer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const renderPopupsandLoader = (offerState: any, offerDispatch: any) => {
  return (
    <Fragment>
      {offerState.displayResponse && (
        <ResponsePopup message={offerState.response} dispatch={offerDispatch} />
      )}
      {offerState.error && (
        <ErrorPopup message={offerState.errorInfo} dispatch={offerDispatch} />
      )}
      {offerState.loader && <Loader />}
    </Fragment>
  );
};

export default OffersHistory;
