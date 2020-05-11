import React, { useContext, useState, Fragment } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../Providers/UserProvider";
import userProfile from "../../Images/user-profile.png";
import logo from "../../Images/logo.png";
import { LOGOUT } from "../../ActionTypes/UserActions";
import "./Header.sass";
import { Icon } from "office-ui-fabric-react";

const Header = () => {
  const history = useHistory();
  let { userState, userDispatch }: any = useContext(UserContext);

  const [isDropdownVisible, setisDropdownVisible] = useState(false);

  const handleLogout = () => {
    userDispatch({ type: LOGOUT });
    localStorage.clear();
  };
  return (
    <div className="header">
      <div className="logo-Container">
        <img
          src={logo}
          alt="logo"
          className="logo"
          onClick={() =>
            userState.isAuthenticated
              ? history.push("/userhome")
              : history.push("/")
          }
        />
      </div>
      
    </div>
  );
};

export default Header;
{/* <div className="headernav-Container">
        {userState.isAuthenticated ? (
          <Fragment>
            <button
              className="ms-hiddenMdUp menu-Dropdown"
              onClick={() => setisDropdownVisible(!isDropdownVisible)}
            >
              <Icon iconName="CollapseMenu" />
            </button>
            <button
              className="profile-Container"
              onBlur={() => {
                console.log("dropdown blured");
                setisDropdownVisible(false);
              }}
            >
              <div className="user-Name ms-hiddenMdDown lg-Name">
                {userState.userInfo.name}
              </div>
              <div className="profile-Pic-Container">
                <img
                  src={userProfile}
                  alt="user profile"
                  className="ms-hiddenMdDown profile-Pic"
                  onClick={() => setisDropdownVisible(!isDropdownVisible)}
                />

                {isDropdownVisible ? (
                  <div className="header-Dropdown">
                    <div
                      className="dropdown-Item"
                      onClick={() => {
                        setisDropdownVisible(false);
                        history.push("/bookride");
                      }}
                    >
                      Book Ride
                    </div>
                    <div
                      className="dropdown-Item"
                      onClick={() => {
                        setisDropdownVisible(false);
                        history.push("/offerride");
                      }}
                    >
                      Offer Ride
                    </div>
                    <div
                      className="dropdown-Item"
                      onClick={() => {
                        setisDropdownVisible(false);
                        history.push("/profile");
                      }}
                    >
                      My Profile
                    </div>
                    <div
                      className="dropdown-Item"
                      onClick={() => {
                        setisDropdownVisible(false);
                        history.push("/offershistory");
                      }}
                    >
                      My Offers
                    </div>
                    <div
                      className="dropdown-Item"
                      onClick={() => {
                        setisDropdownVisible(false);
                        history.push("/rideshistory");
                      }}
                    >
                      My Rides
                    </div>
                    <div
                      className="dropdown-Item"
                      onClick={() => {
                        setisDropdownVisible(false);
                        handleLogout();
                        history.push("/login");
                      }}
                    >
                      Logout
                    </div>
                  </div>
                ) : (
                  <Fragment />
                )}
              </div>
            </button>
          </Fragment>
        ) : (
          <div className="menu-Items">
            <button
              className="book-Ride-Button"
              onClick={() => history.push("/bookride")}
            >
              Book Ride
            </button>
            <button
              className="offer-Ride-Button"
              onClick={() => history.push("/offerride")}
            >
              Offer Ride
            </button>
          </div>
        )}
      </div> */}