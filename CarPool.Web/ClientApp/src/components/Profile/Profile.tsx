import React, { useContext, useState, Fragment, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Icon } from "office-ui-fabric-react";
import defaultProfile from "../../Images/user-profile.png";
import "./Profile.sass";
import {
  addVehicle,
  fetchUser,
  updateVehicle,
  updateUser,
  deleteVehicle,
} from "../../Services/UserCalls";
import ResponsePopup from "../ResponsePopup/ResponsePopup";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import Loader from "../Loader/Loader";
import { Redirect } from "react-router-dom";

const Profile = () => {
  const { userState, userDispatch }: any = useContext(UserContext);

  useEffect(() => {
    if (userState.isAuthenticated) fetchUser(userState.userID, userDispatch);
  }, []);

  useEffect(() => {
    {
      if (userState.isAuthenticated) {
        let state = localState;
        state.UserInfo = userState.userInfo;
        localStorage.setItem("isAuthenticated", userState.isAuthenticated);
        localStorage.setItem("userInfo", JSON.stringify(userState.userInfo));
        setLocalState({ ...localState, ...state });
      }
    }
  }, [userState.userInfo]);

  const [localState, setLocalState] = useState({
    UserInfo: userState.userInfo,
    nameEdit: false,
    phoneEdit: false,
    emailEdit: false,
    addVehicle: false,
    editVehicle: false,
  });

  const [errorState, seterrorState] = useState({
    displayError: false,
    errorText: "",
  });

  const renderUserDetailsContainer = () => {
    return (
      <div className="userdetails-Container">
        <img
          src={defaultProfile}
          className="user-Profilepic"
          alt="profile pic"
        />
        <div className="user-Details">
          <div className="name-Container">
            <label className="field-Label">Name</label>
            <label className="colon">:</label>
            {localState.nameEdit ? (
              <input
                className="name-Input"
                value={localState.UserInfo.name}
                onBlur={() => setLocalState({ ...localState, nameEdit: false })}
                onChange={(event: any) => {
                  let state = localState;
                  state.UserInfo.name = event.target.value;
                  setLocalState({ ...localState, ...state });
                }}
              />
            ) : (
              <div className="name-Text">{localState.UserInfo.name}</div>
            )}
            <button
              className="editicon-Button"
              onClick={() => setLocalState({ ...localState, nameEdit: true })}
            >
              <Icon iconName="Edit" className="edit" />
            </button>
          </div>
          <div className="email-Container">
            <label className="field-Label">Email</label>
            <label className="colon">:</label>
            {localState.emailEdit ? (
              <input
                className="email-Input"
                value={localState.UserInfo.email}
                onBlur={() =>
                  setLocalState({ ...localState, emailEdit: false })
                }
                onChange={(event: any) => {
                  let state = localState;
                  state.UserInfo.email = event.target.value;
                  setLocalState({ ...localState, ...state });
                }}
              />
            ) : (
              <div className="email-Text">{localState.UserInfo.email}</div>
            )}
            <button
              className="editicon-Button"
              onClick={() => setLocalState({ ...localState, emailEdit: true })}
            >
              <Icon iconName="Edit" className="edit" />
            </button>
          </div>
          <div className="phone-Container">
            <label className="field-Label">Phone</label>
            <label className="colon">:</label>
            {localState.phoneEdit ? (
              <input
                type="number"
                className="phone-Input"
                value={localState.UserInfo.phone}
                onBlur={() => {
                  setLocalState({ ...localState, phoneEdit: false });
                }}
                onChange={(event: any) => {
                  let state = localState;
                  state.UserInfo.phone = event.target.value;
                  if (state.UserInfo.phone.length !== 10)
                    seterrorState({
                      ...errorState,
                      displayError: true,
                      errorText: "enter valid phone number",
                    });
                  else {
                    seterrorState({
                      ...errorState,
                      displayError: false,
                    });
                  }
                  setLocalState({ ...localState, ...state });
                }}
              />
            ) : (
              <div className="phone-Text">
                {localState.UserInfo.phone === null
                  ? "-"
                  : localState.UserInfo.phone}
              </div>
            )}
            <button
              className="editicon-Button"
              onClick={() => setLocalState({ ...localState, phoneEdit: true })}
            >
              <Icon iconName="Edit" className="edit" />
            </button>
          </div>

          {/* <div className="rating-Container">
      <label className="field-Label">Rating</label>
      <label className="colon">:</label>
      <div className="rating-Text">{localState.UserInfo.rating}</div>
    </div> */}
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {userState.isAuthenticated ? (
        <div className="userprofile-Container">
          <div className="profile-Title">User Profile</div>
          {userState.displayResponse && (
            <ResponsePopup
              message={userState.response}
              dispatch={userDispatch}
            />
          )}
          {userState.error && (
            <ErrorPopup message={userState.errorInfo} dispatch={userDispatch} />
          )}
          {userState.loader && <Loader />}
          {errorState.displayError && (
            <div className="error-Text">{errorState.errorText}</div>
          )}
          <Fragment>{renderUserDetailsContainer()}</Fragment>
          {localState.addVehicle && (
            <div className="addvehicle-Container">
              <VehicleCard
                addVehicle={true}
                handleClose={() =>
                  setLocalState({ ...localState, addVehicle: false })
                }
              />
            </div>
          )}

          {localState.editVehicle && (
            <div className="addvehicle-Container">
              <VehicleCard
                editVehicle={true}
                handleClose={() =>
                  setLocalState({ ...localState, editVehicle: false })
                }
                vehicleConfig={userState.userInfo.vehicles[0]}
              />
            </div>
          )}

          {localState.UserInfo.vehicles !== undefined &&
          localState.UserInfo.vehicles !== null &&
          localState.UserInfo.vehicles.length !== 0 ? (
            <div className="vehicles-Container">
              <div className="vehiclecontainer-Title">Vehicles List</div>
              {localState.UserInfo.vehicles.map(
                (vehicle: any, index: number) => (
                  <VehicleCard
                    addVehicle={false}
                    vehicleConfig={vehicle}
                    handleEditvehicle={() =>
                      setLocalState({ ...localState, editVehicle: true })
                    }
                    key={index}
                  />
                )
              )}
            </div>
          ) : (
            <div className="novehicles-Container">
              <div className="novehicles-Text">
                No vehicle registered with the account
              </div>
              <button
                className="add-Vehicle"
                onClick={() =>
                  setLocalState({ ...localState, addVehicle: true })
                }
              >
                +add vehicle
              </button>
            </div>
          )}

          <button
            className="save-Profile"
            onClick={() => updateUser(localState.UserInfo, userDispatch)}
          >
            save
          </button>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </Fragment>
  );
};

const VehicleCard = (props: any) => {
  const { userState, userDispatch }: any = useContext(UserContext);

  const [vehicleCardState, setvehicleCardState] = useState({
    id: 0,
    name: "",
    type: "",
    vehicleNo: "",
    seatingCount: 0,
    userID: userState.userInfo.id,
  });

  const [showdeleteWarning, setshowdeleteWarning] = useState(false);

  const [errorState, seterrorState] = useState({
    displayError: false,
    errorText: "",
  });

  useEffect(() => {
    if (props.editVehicle)
      setvehicleCardState({ ...vehicleCardState, ...props.vehicleConfig });
  }, []);

  return (
    <div className="vehicle-Card">
      {props.addVehicle ||
        (props.editVehicle && userState.loader && <Loader />)}
      {showdeleteWarning ? (
        <div className="deletewarning-Container">
          <div className="deletewarning-Card">
            <div className="deletewarning-Text">Confirm vehicle delete</div>
            <div className="deletewarning-Footer">
              <button
                className="delete-Confirm"
                onClick={() => {
                  setshowdeleteWarning(false);
                  deleteVehicle(props.vehicleConfig.id, userDispatch);
                  fetchUser(userState.userID, userDispatch);
                }}
              >
                delete
              </button>
              <button
                className="delete-Cancel"
                onClick={() => setshowdeleteWarning(false)}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Fragment />
      )}
      {props.addVehicle ? (
        <div className="vehiclecard-Title">
          <div className="vehiclecard-TitleText">Add Vehicle</div>
          <button className="close-Icon" onClick={() => props.handleClose()}>
            <Icon iconName="ChromeClose" />
          </button>
        </div>
      ) : (
        <Fragment />
      )}
      {props.editVehicle ? (
        <div className="vehiclecard-Title">
          <div className="vehiclecard-TitleText">Edit Vehicle</div>
          <button className="close-Icon" onClick={() => props.handleClose()}>
            <Icon iconName="ChromeClose" />
          </button>
        </div>
      ) : (
        <Fragment />
      )}
      {errorState.displayError && (
        <div className="error-Text">{errorState.errorText}</div>
      )}
      <div className="vehicle-Title">
        <div className="field-Label">Name</div>
        <label className="colon">:</label>
        {props.addVehicle || props.editVehicle ? (
          <input
            className="field-Value"
            placeholder="e.g:i20 sportz"
            value={vehicleCardState.name}
            onChange={(event: any) => {
              setvehicleCardState({
                ...vehicleCardState,
                name: event.target.value,
              });
            }}
          />
        ) : (
          <div className="field-Value">{props.vehicleConfig.name}</div>
        )}
      </div>
      <div className="vehicle-Type">
        <label className="field-Label">Type</label>
        <label className="colon">:</label>
        {props.addVehicle || props.editVehicle ? (
          <input
            className="field-Value"
            placeholder="e.g car,bike,etc.."
            value={vehicleCardState.type}
            onChange={(event: any) => {
              setvehicleCardState({
                ...vehicleCardState,
                type: event.target.value,
              });
            }}
          />
        ) : (
          <div className="field-Value">{props.vehicleConfig.type}</div>
        )}
      </div>
      <div className="vehicle-Number">
        <label className="field-Label">Vehicle No</label>
        <label className="colon">:</label>
        {props.addVehicle || props.editVehicle ? (
          <input
            className="field-Value"
            placeholder="e.g AP05 AB 1234"
            value={vehicleCardState.vehicleNo}
            onChange={(event: any) => {
              if (event.target.value.length !== 12)
                seterrorState({
                  ...errorState,
                  displayError: true,
                  errorText: "enter valid vehicle no",
                });
              else
                seterrorState({
                  ...errorState,
                  displayError: false,
                  errorText: "",
                });
              setvehicleCardState({
                ...vehicleCardState,
                vehicleNo: event.target.value,
              });
            }}
          />
        ) : (
          <div className="field-Value">{props.vehicleConfig.vehicleNo}</div>
        )}
      </div>

      <div className="vehicle-Seatingcount">
        <label className="field-Label">Seating</label>
        <label className="colon">:</label>
        {props.addVehicle || props.editVehicle ? (
          <input
            type="number"
            className="field-Value"
            value={
              vehicleCardState.seatingCount ? vehicleCardState.seatingCount : ""
            }
            onChange={(event: any) => {
              if (event.target.value.length !== 1)
                seterrorState({
                  ...errorState,
                  displayError: true,
                  errorText: "seating cannot be greater than 9",
                });
              else
                seterrorState({
                  ...errorState,
                  displayError: false,
                  errorText: "",
                });
              setvehicleCardState({
                ...vehicleCardState,
                seatingCount: parseInt(event.target.value),
              });
            }}
          />
        ) : (
          <div className="field-Value">{props.vehicleConfig.seatingCount}</div>
        )}
      </div>

      {/* {props.addVehicle || props.editVehicle ? (
        <Fragment />
      ) : (
        <div className="vehicle-Status">
          <label className="field-Label">Status</label>
          <label className="colon">:</label>
          <div className="status-Label">{props.vehicleConfig.status}</div>
        </div>
      )} */}
      <div className="vehicle-Footer">
        {props.addVehicle ? (
          <button
            className="add-Button"
            onClick={(event: any) => {
              event.preventDefault();
              console.log(vehicleCardState);
              props.handleClose();
              addVehicle(vehicleCardState, userDispatch);
              fetchUser(userState.userID, userDispatch);
            }}
          >
            Add
          </button>
        ) : (
          <Fragment />
        )}

        {!props.addVehicle && !props.editVehicle && (
          <Fragment>
            <button
              className="edit-Button"
              onClick={() => props.handleEditvehicle()}
            >
              Edit
            </button>
            <button
              className="delete-Button"
              onClick={() => setshowdeleteWarning(true)}
            >
              Delete
            </button>
          </Fragment>
        )}

        {props.editVehicle ? (
          <button
            className="add-Button"
            onClick={(event: any) => {
              event.preventDefault();
              console.log(vehicleCardState);
              props.handleClose();
              updateVehicle(vehicleCardState, userDispatch);
              fetchUser(userState.userID, userDispatch);
            }}
          >
            Update
          </button>
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
};

export default Profile;
