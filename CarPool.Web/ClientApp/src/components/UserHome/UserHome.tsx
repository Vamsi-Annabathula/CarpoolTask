import React, { useContext, Fragment } from "react";
import { UserContext } from "../../contexts/UserContext";
import backgroundImage from "../../Images/rideoptionsbg.png";
import "office-ui-fabric-react/dist/css/fabric.css";
import "./UserHome.sass";
import { useHistory, Redirect } from "react-router";

const UserHome = () => {
  const history = useHistory();
  let { userState }: any = useContext(UserContext);
  if (userState.isAuthenticated) {
    localStorage.setItem("isAuthenticated", userState.isAuthenticated);
    localStorage.setItem("userInfo", JSON.stringify(userState.userInfo));
  }

  return (
    <div className="user-Home">
      {userState.isAuthenticated ? (
        <Fragment>
          <div className="userhome-Container">
            <div className="welcome-User">Hey {userState.userInfo.name}</div>
            <div className="user-Home-Buttons">
              <button
                className="bookride-Button"
                onClick={() => history.push("/bookride")}
              >
                Book a ride
              </button>
              <button
                className="offerride-Button"
                onClick={() => history.push("/offerride")}
              >
                Offer a ride
              </button>
            </div>
          </div>
          <img
            className="ms-hiddenMdDown background-Image"
            src={backgroundImage}
            alt="background"
          />
        </Fragment>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default UserHome;
